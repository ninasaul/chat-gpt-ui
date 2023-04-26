import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import './style.less'
import { isObject } from '../utils'

export const SelectOption = (props) => {
  const { option, handleSelectOption, isSelected } = props
  const handleClick = () => {
    handleSelectOption(option)
  }

  return (
    <div
      className={`select-option ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {isObject(option) ? option.label : option}
    </div>
  )
}

export const Select = (props) => {
  const { options, placeholder, isMulti, showClear } = props
  const [selectedOptions, setSelectedOptions] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const selectRef = useRef(null)

  const handleSelectOption = option => {
    if (isMulti) {
      setSelectedOptions(prevSelectedOptions => [
        ...prevSelectedOptions,
        option
      ])
    } else {
      setSelectedOptions([option])
    }
    setSearchValue('')
  }

  const handleRemoveOption = optionToRemove => {
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.filter(
        option => option.value !== optionToRemove.value
      )
    )
  }

  const handleClear = () => {
    setSelectedOptions([])
    setSearchValue('')
    selectRef.current.focus()
  }

  const handleInputChange = e => {
    setSearchValue(e.target.value)
  }

  const filteredOptions = options.filter(option =>
    isObject(option)
      ? option.label.toLowerCase().includes(searchValue.toLowerCase())
      : option
  )

  return (
    <div className='select-wrapper'>
      <div className='select-input-wrapper'>
        {selectedOptions.length > 0 &&
          selectedOptions.map(option => (
            <div key={option.value} className='selected-option'>
              {option.label}
              {showClear && (
                <button
                  className='remove-button'
                  onClick={() => handleRemoveOption(option)}
                >
                  X
                </button>
              )}
            </div>
          ))}
        <input
          className='select-input'
          type='text'
          value={searchValue}
          onChange={handleInputChange}
          placeholder={selectedOptions.length === 0 ? placeholder : ''}
          ref={selectRef}
        />
        {selectedOptions.length > 0 && showClear && (
          <button className='clear-button' onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
      {searchValue.length > 0 ? (
        <div className='select-options'>
          {filteredOptions.map(option => (
            <SelectOption
              key={option.value}
              option={option}
              handleSelectOption={handleSelectOption}
              isSelected={selectedOptions.some(
                selectedOption => selectedOption.value === option.value
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  showClear: PropTypes.bool
}

Select.defaultProps = {
  placeholder: 'Select an option...',
  isMulti: false,
  showClear: false
}

