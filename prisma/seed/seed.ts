import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const prisma = new PrismaClient()
await main()
async function main() {
  const curDir = process.cwd()
  const csvArr = ReadCSVToArray(curDir + '/public/data/food-trucks.csv')
  const foodTrucks = TreatCsvArray(csvArr)
  await SeedFoodTrucks(foodTrucks)
  console.info('Seeded food trucks')
}

type FoodTruck = {
  name: string
  type: string
  cnn: number
  LocationDescription: string
  Address: string
  block: string
  lot: string
  //   dayshours: string
  foodItems: string[]
  permit: string
  latitude: number
  longitude: number
  status: string
}
function ReadCSVToArray(filePath: string) {
  try {
    const csv = readFileSync(filePath, 'utf8')
    const lines = csv.split('\n')
    const columns = lines.map((line) => {
      return line.split(',')
    })
    // Remove the header row
    columns.shift()
    return columns
  } catch (error) {
    console.error('FATAL: Error reading CSV file:', error)
    throw error
  }
}

function TreatCsvArray(csvArr: string[][]): FoodTruck[] {
  return csvArr
    .map((row) => {
      try {
        const fTruck = RowToFoodTruck(row)
        return fTruck
      } catch (error) {
        console.error('Error:', error)
        return null
      }
    })
    .filter(Boolean) as FoodTruck[]
}

function RowToFoodTruck(row: string[]): FoodTruck {
  return {
    name: GetStringOrThrow(row[1]),
    type: GetStringOrThrow(row[2]),
    cnn: Number(row[3]),
    LocationDescription: row[4] ?? '',
    Address: row[5] ?? '',
    block: row[7] ?? '',
    lot: row[8] ?? '',
    permit: row[9] ?? '',
    status: row[10] ?? '',
    foodItems: GetFoodItems(row[11]),
    // dayshours: row[12] ?? '',
    latitude: GetLocation(row[13] + ',' + row[14]).latitude,
    longitude: GetLocation(row[13] + ',' + row[14]).longitude,
  }
}

function GetLocation(loc: string | undefined): { latitude: number; longitude: number } {
  if (!loc) throw new Error('Invalid location: ' + String(loc))
  const latitude = Number(
    GetStringOrThrow(loc.split(',')[0]?.replace('(', '').replace('"', '').trim()),
  )
  const longitude = Number(
    GetStringOrThrow(loc.split(',')[1]?.replace(')', '').replace('"', '').trim()),
  )
  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error('Invalid location: ' + String(loc))
  }
  return { latitude, longitude }
}

function GetStringOrThrow(item: unknown): string {
  if (typeof item === 'string' && item !== '') {
    return item
  }

  throw new Error('Invalid SOT: ' + String(item))
}

function GetFoodItems(foodItems: string | undefined): string[] {
  if (!foodItems) return []
  return foodItems
    .split(':')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => typeof item === 'string' && item !== '')
}

async function SeedFoodTrucks(foodTrucks: FoodTruck[]) {
  try {
    for await (const foodTruck of foodTrucks) {
      console.log('Seeding food truck:', foodTruck.name)
      await prisma.foodTruck.create({
        data: {
          name: foodTruck.name.substring(0, 254),
          cnn: foodTruck.cnn,
          type: foodTruck.type,
          LocationDescription: foodTruck.LocationDescription,
          Address: foodTruck.Address,
          block: foodTruck.block,
          lot: foodTruck.lot,
          permit: foodTruck.permit,
          status: foodTruck.status,
          //   dayshours: foodTruck.dayshours,
          latitude: foodTruck.latitude,
          longitude: foodTruck.longitude,
          foodItems: {
            connectOrCreate: foodTruck.foodItems.map((item) => ({
              create: {
                name: item.substring(0, 254),
              },
              where: {
                name: item.substring(0, 254),
              },
            })),
          },
        },
      })
    }
    return true
  } catch (error) {
    console.error('FATAL: Error seeding food trucks:', error)
    throw error
  }
}
