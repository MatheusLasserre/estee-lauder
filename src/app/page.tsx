import { CommonText } from '~/components/utils/Text'
import Style from './index.module.css'
import { TruckFinder } from '~/components/trucks/Finder'

export default async function Home() {
  return (
    <div className={Style.container}>
      <h1 className={Style.title}>I want food!</h1>
      <CommonText color='BLACK1' textAlign='center' fontSize='22px' fontWeight='500' marginTop='-24px'>
        In a truck
      </CommonText>
      <CommonText fontSize='20px' textAlign='center' color='BLACK1' fontWeight='400' marginTop='20px'>
        Find some food truck based on your location and preferences.
      </CommonText>
      <TruckFinder />
    </div>
  )
}
