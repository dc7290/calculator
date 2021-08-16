import type { NextPage } from 'next'
import { useReducer } from 'react'

import { Button } from '~/src/components/base/atoms/Button'
import { IndicatesField } from '~/src/components/base/atoms/IndicatesField'

type State =
  | {
      firstValue: string
      secondValue: string
      result: null
      isPending: true
    }
  | {
      firstValue: string
      secondValue: null
      result: null | string
      isPending: false
    }

type Action =
  | {
      type: 'set'
      payload: string
    }
  | {
      type: 'transform'
    }
  | {
      type: 'percentage'
    }
  | {
      type: 'allClear'
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set':
      if (state.isPending) {
        if (state.secondValue.length === 9) {
          return state
        }

        if (action.payload === '.') {
          if (state.secondValue.includes('.')) {
            return state
          } else {
            return {
              ...state,
              secondValue: `${state.secondValue}${action.payload}`,
            }
          }
        }

        return {
          ...state,
          secondValue: state.secondValue === '0' ? action.payload : `${state.secondValue}${action.payload}`,
        }
      } else {
        if (state.firstValue.length === 9) {
          return state
        }

        if (action.payload === '.') {
          if (state.firstValue.includes('.')) {
            return state
          } else {
            return {
              ...state,
              firstValue: `${state.firstValue}${action.payload}`,
            }
          }
        }

        return {
          ...state,
          firstValue: state.firstValue === '0' ? action.payload : `${state.firstValue}${action.payload}`,
        }
      }

    case 'transform':
      if (state.isPending) {
        if (state.secondValue === '0') {
          return state
        }

        return {
          ...state,
          secondValue: state.secondValue.startsWith('-')
            ? state.secondValue.replace(/^-/, '')
            : `-${state.secondValue}`,
        }
      } else {
        if (state.firstValue === '0') {
          return state
        }

        return {
          ...state,
          firstValue: state.firstValue.startsWith('-') ? state.firstValue.replace(/^-/, '') : `-${state.firstValue}`,
        }
      }

    case 'percentage':
      if (state.isPending) {
        return {
          ...state,
          secondValue:
            state.secondValue.endsWith('0') || state.secondValue.endsWith('.')
              ? '0'
              : (Number(state.secondValue) / 100).toString(),
        }
      } else {
        return {
          ...state,
          firstValue:
            state.firstValue.endsWith('0') || state.firstValue.endsWith('.')
              ? '0'
              : (Number(state.firstValue) / 100).toString(),
        }
      }

    case 'allClear':
      return {
        firstValue: '0',
        secondValue: null,
        result: null,
        isPending: false,
      }
  }
}

const initialState: State = {
  firstValue: '0',
  secondValue: null,
  result: null,
  isPending: false,
}
const IndexPage: NextPage = () => {
  const [{ firstValue, secondValue, result }, dispatch] = useReducer(reducer, initialState)

  const handleAllClear = () => {
    dispatch({ type: 'allClear' })
  }
  const handleTransform = () => {
    dispatch({ type: 'transform' })
  }
  const handlePercentage = () => {
    dispatch({ type: 'percentage' })
  }
  const handleNumberInput = (num: string) => {
    dispatch({ type: 'set', payload: num })
  }

  return (
    <main className="relative flex items-center justify-center h-screen bg-indigo-100">
      <div className="w-[296px] p-2 bg-gray-900 rounded-xl">
        <IndicatesField value={result ?? secondValue ?? firstValue} />
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Button text="AC" className="text-white bg-gray-500" onPress={handleAllClear} />
          <Button text="+/-" className="text-white bg-gray-500" onPress={handleTransform} />
          <Button text="%" className="text-white bg-gray-500" onPress={handlePercentage} />
          <Button text="÷" className="bg-yellow-400" />
          <Button text="7" className="bg-indigo-200/90" onPress={() => handleNumberInput('7')} />
          <Button text="8" className="bg-indigo-200/90" onPress={() => handleNumberInput('8')} />
          <Button text="9" className="bg-indigo-200/90" onPress={() => handleNumberInput('9')} />
          <Button text="×" className="bg-yellow-400" />
          <Button text="4" className="bg-indigo-200/90" onPress={() => handleNumberInput('4')} />
          <Button text="5" className="bg-indigo-200/90" onPress={() => handleNumberInput('5')} />
          <Button text="6" className="bg-indigo-200/90" onPress={() => handleNumberInput('6')} />
          <Button text="-" className="bg-yellow-400" />
          <Button text="1" className="bg-indigo-200/90" onPress={() => handleNumberInput('1')} />
          <Button text="2" className="bg-indigo-200/90" onPress={() => handleNumberInput('2')} />
          <Button text="3" className="bg-indigo-200/90" onPress={() => handleNumberInput('3')} />
          <Button text="+" className="bg-yellow-400" />
          <Button text="0" className="bg-indigo-200/90 col-span-2" onPress={() => handleNumberInput('0')} />
          <Button text="." className="bg-indigo-200/90" onPress={() => handleNumberInput('.')} />
          <Button text="=" className="bg-yellow-400" />
        </div>
      </div>
    </main>
  )
}

export default IndexPage
