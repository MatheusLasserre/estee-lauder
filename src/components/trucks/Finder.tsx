'use client'
import React, { useEffect } from 'react'
import { CardStyle, FlexColumn, FlexRow } from '../utils/Utils'
import { CTextFilter } from '../utils/Inputs'
import { StateButton } from '../utils/Buttons'
import { api, RouterOutputs } from '~/trpc/react'
import { CommonText } from '../utils/Text'
import { LoadingZero } from '../utils/Loading'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useTarget from '~/hooks/useTarget'

export const TruckFinder = () => {
  // Query Food Trucks related
  const [query, setQuery] = React.useState('')
  const [foodTrucksData, setFoodTrucksData] = React.useState<Truck[]>([])
  type FoodItem = {
    name: string
  }
  const [foodItemsFilter, setFoodItemsFilter] = React.useState<FoodItem[]>([])
  const foodTrucks = api.food.getFoodTrucksPaginated.useQuery({
    page: 1,
    limit: 10,
    search: query,
    foodItemsFilter: foodItemsFilter.map((item) => item.name),
  })

  // Prevents Flash of empty content
  useEffect(() => {
    if (foodTrucks.data) {
      setFoodTrucksData(foodTrucks.data.foodTrucks)
    }
  }, [foodTrucks.data])

  // Prevent Query from being sent to the server on every keystroke
  const [searchValue, setSearchValue] = React.useState('')
  const [queryTimeout, setQueryTimeout] = React.useState<NodeJS.Timeout>()
  const handleSearchDelay = (query: string) => {
    setSearchValue(query)
    clearTimeout(queryTimeout)
    const timeout = setTimeout(() => {
      setQuery(query)
    }, 500)
    setQueryTimeout(timeout)
  }
  const handleClear = () => {
    setQuery('')
    setSearchValue('')
  }
  const [animRef] = useAutoAnimate()
  return (
    <FlexColumn horizontalAlign='center' margin='20px auto 0 auto'>
      <FlexRow horizontalAlign='center' width='90%' verticalAlign='center'>
        <CTextFilter
          type='text'
          onChange={(e) => handleSearchDelay(e.currentTarget.value)}
          placeholder='Search for a food truck...'
          value={searchValue}
          onClear={() => handleClear()}
        />
        <FoodTagsFilter foodItem={foodItemsFilter} setFoodItemsFilter={setFoodItemsFilter} />
        {foodTrucks.isLoading && <LoadingZero width={20} />}
      </FlexRow>
      <FlexRow
        width='100%'
        height='100%'
        horizontalAlign='center'
        verticalAlign='stretch'
        maxWidth='1280px'
        gap='15px'
        flexWrap='wrap'
        margin='30px auto'
        ref={animRef}
      >
        {foodTrucksData.map((truck) => (
          <TruckCard key={truck.id} truck={truck} />
        ))}
      </FlexRow>
    </FlexColumn>
  )
}

type Truck = RouterOutputs['food']['getFoodTrucksPaginated']['foodTrucks'][0]

export const TruckCard: React.FC<{ truck: Truck }> = ({ truck }) => {
  const [details, setDetails] = React.useState(false)
  const [animRef] = useAutoAnimate()
  return (
    <CardStyle>
      <FlexColumn gap='0px' width='300px' padding='10px' ref={animRef} height='100%'>
        <CommonText fontSize='18px' fontWeight='700' color='BLACK1' marginBottom='10px'>
          {truck.name}
        </CommonText>
        <FlexRow
          gap='10px'
          width='100%'
          horizontalAlign='flex-start'
          maxWidth='300px'
          flexWrap='wrap'
          rowGap='4px'
          margin='0 0 10px 0'
        >
          {truck.foodItems.map((item) => (
            <FoodItem key={`${item.name}-${truck.id}`} foodItem={item.name} />
          ))}
        </FlexRow>

        <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
          <HighLightText> Address:</HighLightText>
          {truck.Address}
        </CommonText>
        <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
          <HighLightText>Blocklot:</HighLightText>
          {truck.block} {truck.lot}
        </CommonText>
        <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
          <HighLightText> Type:</HighLightText> {truck.type}
        </CommonText>
        <a
          href={`https://www.google.com/maps/search/${truck.latitude},${truck.longitude}?`}
          target='_blank'
          style={{
            color: 'var(--BLUE1)',
            fontWeight: '700',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'Inter',
          }}
        >
          See on Google Maps
        </a>
        {details && (
          <FlexColumn gap='0px' width='100%'>
            <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
              <HighLightText> Location Description:</HighLightText> {truck.LocationDescription}
            </CommonText>
            <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
              <HighLightText> Permit:</HighLightText> {truck.permit}
            </CommonText>
            <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
              <HighLightText>Status:</HighLightText> {truck.status}
            </CommonText>
            <CommonText fontSize='14px' fontWeight='400' color='BLACK1'>
              <HighLightText>CNN: </HighLightText>
              {truck.cnn}
            </CommonText>
          </FlexColumn>
        )}
        <p
          style={{
            color: 'var(--BLACK1)',
            fontWeight: '500',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'Inter',
            marginTop: '10PX',
          }}
          onClick={() => setDetails(!details)}
        >
          {details ? 'close details' : 'show details'}
        </p>
      </FlexColumn>
    </CardStyle>
  )
}

const FoodItem: React.FC<{ foodItem: string; onClick?: () => void; color?: string }> = ({
  foodItem,
  onClick,
  color,
}) => {
  return (
    <p
      title={foodItem}
      style={{
        backgroundColor: color || 'var(--GREEN4)',
        width: 'fit-content',
        fontSize: '12px',
        fontFamily: 'Inter',
        color: 'var(--WHITE1)',
        fontWeight: '500',
        padding: '2px 4px',
        borderRadius: '4px',
        margin: '0',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {foodItem}
    </p>
  )
}


type FoodTagProps = {
  setFoodItemsFilter: React.Dispatch<React.SetStateAction<{ name: string }[]>>
  foodItem: {
    name: string
  }[]
}
const FoodTagsFilter: React.FC<FoodTagProps> = ({ setFoodItemsFilter, foodItem }) => {
  const { isTarget: showFilter, setIsTarget: setShowFilter, ref } = useTarget(false)
  const [animRef] = useAutoAnimate()
  const [foodItemQuery, setFoodItemQuery] = React.useState('')
  const foodItems = api.food.getFoodItemsQuery.useQuery({
    foodItem: foodItemQuery,
  })
  useEffect(() => {
    if (foodItems.data) {
      setFoodItemsList(foodItems.data.foodItems.map((item) => item.name))
    }
  }, [foodItems.data])
  const [foodItemsList, setFoodItemsList] = React.useState<string[]>([])
  const handleClear = () => {
    setFoodItemsFilter([])
    setShowFilter(false)
  }
  return (
    <FlexColumn
      gap='0px'
      width='100px'
      ref={ref}
      horizontalAlign='center'
      maxWidth='300px'
      margin='0 0 0 0'
      styles={{
        position: 'relative',
      }}
    >
      <FlexColumn maxWidth='100px'>
        <StateButton type='compact' onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? 'Close' : 'Filter by Food Items'}
        </StateButton>
      </FlexColumn>
      {showFilter && (
        <FlexColumn
          ref={animRef}
          styles={{
            position: 'absolute',
            top: '55px',
            left: '0',
            width: '300px',
            maxWidth: '300px',
            height: 'max-content',
            maxHeight: '400px',
            zIndex: '100',
            padding: '10px',
            backgroundColor: '#dadada',
            boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CTextFilter
            type='text'
            onChange={(e) => setFoodItemQuery(e.currentTarget.value)}
            placeholder='Search for a food truck...'
            value={foodItemQuery}
            onClear={() => setFoodItemQuery('')}
          />
          <FlexColumn
            maxHeight='200px'
            styles={{
              overflowY: 'scroll',
            }}
          >
            {foodItem.map((item) => (
              <FoodItem
                foodItem={item.name}
                key={`${item.name}-${foodItem}-filter`}
                onClick={() =>
                  setFoodItemsFilter((prev) => [...prev.filter((el) => el.name !== item.name)])
                }
              />
            ))}
          </FlexColumn>
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'var(--BLACK1)',
              color: 'var(--BLACK1)',
              marginTop: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            -
          </div>
          <FlexColumn
            maxHeight='200px'
            styles={{
              overflowY: 'scroll',
            }}
          >
            {foodItemsList
              .filter((item) => !foodItem.some((el) => el.name === item))
              .map((item) => (
                <FoodItem
                  foodItem={item}
                  key={`${item}-${foodItem}-filter`}
                  color='var(--GRAY2)'
                  onClick={() => setFoodItemsFilter((prev) => [...prev, { name: item }])}
                />
              ))}
          </FlexColumn>
          <StateButton type='compact' onClick={() => handleClear()}>
            Clear
          </StateButton>
        </FlexColumn>
      )}
    </FlexColumn>
  )
}

const HighLightText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <span
      style={{
        fontWeight: '700',
      }}
    >
      {children}
    </span>
  )
}