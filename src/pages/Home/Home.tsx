import React, { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'

import { Container } from '@/components/Container'

import { Tabs, TabList, Tab, TabPanel } from '@/components/TapsContent'
import { StepItem, Steps } from '@/components/Steps'
import { Checkbox } from '@/components/Checkbox'
import { useForm } from 'react-hook-form'
import { List } from '@/components/List'
import { Row } from '@/components/Row'
import { Tooltip } from '@/components/Tooltip/Tooltip'
import {
  FontSizePullDown,
  Values,
} from '@/components/modules/SettingMenu/FontSizePullDown'
import { TColumn, TableResize } from '@/components/modules/TableResize'
import { TAllProduct } from '@/typing/AllProduct'
import { allProduct } from '../AllProduct/_mock'
import { range } from '@/utils/range'
import { Carousel } from '@/components/modules/Carousel'

const accessory = 'accessory'

export const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
]

export const Home: React.FC = () => {
  const [addGoodsCompleted, setAddGoodsCompleted] = useState<boolean>(false)
  const [changeStep, setChangeStep] = useState<number>(0)

  useEffect(() => {
    if (addGoodsCompleted) {
      const element = document.getElementById(accessory)
      if (element) {
        if ('scrollBehavior' in document.documentElement.style) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          smoothScrollIntoView(element, { behavior: 'smooth', block: 'start' })
        }
      }
      setAddGoodsCompleted(false)
    }
  }, [addGoodsCompleted])

  const steps: string[] = [
    'contractType',
    'Select phone number',
    'Select Acessory',
    'Estimate',
    'Payment',
    'Complete',
  ]
  type Input = {
    checkbox: string
  }
  const { register } = useForm<Input>()

  const columns: TColumn[] = [
    {
      title: 'name',
      name: 'name',
      render: v => <Text>{v}</Text>,
    },
    { title: 'price', name: 'price', render: v => <Text>{v}</Text> },
    { title: 'des', name: 'des', render: v => <Text>{v}</Text> },
  ]

  const data = [
    { name: 'name', des: 'des1', price: '1001' },
    { name: 'name2', des: 'des2', price: '1002' },
    { name: 'name2', des: 'des3', price: '1003' },
  ]

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container>
        {/* <Checkbox name="name" value="hoa" register={register('checkbox')} />
        <Steps currentIndex={changeStep}>
          {steps.map((step, index) => (
            <StepItem key={index}>{step}</StepItem>
          ))}
        </Steps>
        <div style={{ display: 'flex' }}>
          <p>Flex basis</p>
          <div
            style={{
              maxHeight: '24px',
              zIndex: '1',
              flexBasis: '128px',
              position: 'relative',
            }}
          >
            <FontSizePullDown onChange={() => {}} defaultValue={Values.STANDARD} />
          </div>
        </div>

        <List>
          {products.map(product => (
            <Row key={product.id} title={product.title}></Row>
          ))}
        </List>
        <Tooltip label="hello world">hello world</Tooltip>
        <>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
            }}
          >
            <li>
              <button
                onClick={() => {
                  setChangeStep(prev => prev - 1)
                }}
              >
                prve
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setChangeStep(prev => prev + 1)
                }}
              >
                next
              </button>
            </li>
          </ul>
        </> */}

        <TableResize resizeable bordered columns={columns} data={data} />

        {/* <Tabs defaultIndex={2} variant="fullWidth" align="end">
          <TabList>
            <Tab disabled>おトクにマネ活</Tab>
            <Tab>データ使い放題</Tab>
            <Tab>使う分だけ クに 使う分だけ ク</Tab>
          </TabList>

          <TabPanel>
            <div style={{ padding: '10px' }}>
              <Tabs defaultIndex={0} align="end">
                <TabList>
                  <Tab>おトクにマネ活</Tab>
                  <Tab>データ使い放題</Tab>
                  <Tab>使う分だけ</Tab>
                </TabList>

                <TabPanel>
                  <h1>section1</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section2</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section3</h1>
                </TabPanel>
              </Tabs>
            </div>
            <h1>section1</h1>
          </TabPanel>
          <TabPanel>
            <h1>section2</h1>
          </TabPanel>
          <TabPanel>
            <h1>section3</h1>
            <div style={{ padding: '10px' }}>
              <Tabs defaultIndex={0} align="end">
                <TabList>
                  <Tab>おトクにマネ活</Tab>
                  <Tab>
                    データ使い放題 データ使い放題 データ使い放題 データ使い放題
                    データ使い放題
                  </Tab>
                  <Tab>使う分だけ</Tab>
                </TabList>

                <TabPanel>
                  <h1>section1</h1>
                </TabPanel>
                <TabPanel>
                  <h1>section2</h1>
                </TabPanel>
                <TabPanel>
                  <div style={{ padding: '10px' }}>
                    <Tabs defaultIndex={0} align="end">
                      <TabList>
                        <Tab>おトクにマネ活</Tab>
                        <Tab>データ使い放題</Tab>
                        <Tab>使う分だけ</Tab>
                        <Tab>使う分だけ 使う分だけ使う分だけ</Tab>
                      </TabList>

                      <TabPanel>
                        <h1>section1</h1>
                      </TabPanel>
                      <TabPanel>
                        <h1>section2</h1>
                      </TabPanel>
                      <TabPanel>
                        <h1>section3</h1>
                      </TabPanel>
                    </Tabs>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </TabPanel>
        </Tabs> */}

        <p id={accessory}>Home</p>
      </Container>
    </>
  )
}
