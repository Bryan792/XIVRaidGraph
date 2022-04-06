import Head from 'next/head'
import styles from '../styles/Home.module.css'

import 'chartjs-adapter-moment'

import NoSSRWrapper from '../components/no-ssr-wrapper'

import fightsData from '../fights.json'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeSeriesScale,
  TimeScale,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'
ChartJS.register(
  LinearScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

import { useMemo, useCallback, useEffect, useRef, useState } from 'react'

export default function Home() {
  const [fights, setFights] = useState([])

  const timerCallback = useCallback(() => {
    setFights((fights) => fightsData.slice(0, fights.length + 1))
  }, [])
  useEffect(() => {
    timerRef.current = setInterval(timerCallback, 10)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  const timerRef = useRef(0)

  return (
    <NoSSRWrapper>
      <div className={styles.container}>
        <main className={styles.main}>
          <Scatter
            options={{
              events: ['click'],
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: 'timeseries',
                  position: 'bottom',
                  time: {
                    unit: 'day',
                    stepSize: 7,
                  },
                },
                y: {
                  ticks: {
                    // forces step size to be 50 units
                    stepSize: 100,
                    callback: function (value, index, ticks) {
                      switch (value) {
                        case 0:
                          return ''
                        case 100:
                          return 'Erichthonios'
                        case 200:
                          return 'Hippokampos'
                        case 300:
                          return 'Phoinix'
                        case 400:
                          return 'Hesperos'
                        case 500:
                          return 'Hesperos II'
                      }
                    },
                  },
                },
              },
            }}
            data={{
              datasets: [
                {
                  label: 'Solo Party',
                  data: fights.map((fight) => {
                    let percent = fight.percent
                    switch (fight.name) {
                      case 'Hippokampos':
                        percent += 100
                        break
                      case 'Phoinix':
                        percent += 200
                        break
                      case 'Hesperos':
                        percent = percent * 2 + 300
                        break
                      case 'Hesperos II':
                        percent += 400
                        break
                    }
                    return {
                      x: fight.date,
                      y: percent,
                    }
                  }),
                  pointBackgroundColor: fights.map((fight) => {
                    switch (fight.name) {
                      case 'Erichthonios':
                        return 'purple'
                      case 'Hippokampos':
                        return 'blue'
                      case 'Phoinix':
                        return 'red'
                      case 'Hesperos':
                        return 'gray'
                      case 'Hesperos II':
                        return 'black'
                    }
                  }),
                },
              ],
            }}
          />
        </main>
      </div>
    </NoSSRWrapper>
  )
}
