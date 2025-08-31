import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Combobox } from '.'
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadIndicator from '../LoadIndicator';

export const AsyncSelect = ({
    otherParams = {},
    enableQuery = true,
    bindBy = undefined,
    customValue = false,
    url, value, cacheOption, defaultOption = null, onChange, placeholder = '', itemValueAccessor = null,
    itemNameAccessor = null, nullable = false, label = null, multiple = false,
    itemStringNameAccessor = null
}) => {

    const [q, setQ] = useState('');

    const { data, isLoading } = useQuery(
        [cacheOption || url, { ...otherParams, q }],
        () => axios.get(url, {
            params: {
                q,
                ...otherParams
            }
        }).then(res => res.data),
        {
            enabled: enableQuery,
            refetchOnWindowFocus: false,
            staleTime: 5000
        }
    )

    function getItemValue(item) {
        if (typeof itemValueAccessor === 'function') {
            return itemValueAccessor(item);
        }

        return itemValueAccessor === null ?
            item : item[itemValueAccessor];
    }

    function getItemStringName(item) {
        if (itemStringNameAccessor === null) {
            return getItemName(item);
        }

        if (typeof itemStringNameAccessor === 'function') {
            return itemStringNameAccessor(item);
        }

        if (typeof item === 'string' && typeof itemStringNameAccessor === 'string') {
            return JSON.parse(item) ? JSON.parse(item)[itemStringNameAccessor] : '';
        }

        return item[itemStringNameAccessor];
    }

    function getItemName(item) {
        if (typeof itemNameAccessor === 'function') {
            return itemNameAccessor(item);
        }

        if (typeof item === 'string' && typeof itemNameAccessor === 'string') {
            return JSON.parse(item) ? JSON.parse(item)[itemNameAccessor] : '';
        }

        return itemNameAccessor === null ?
            item : item[itemNameAccessor];
    }

    function removeValueInMultple(index) {

        if (!Array.isArray(value)) {
            return;
        }

        let new_values = value.filter((_, _index) => _index !== index);

        onChange(new_values);
    }

    return (
        <Combobox by={bindBy} value={value} onChange={onChange} nullable={nullable} multiple={multiple}>
            <Combobox.Input
                label={label}
                multiple={multiple}
                value={multiple ? value : value ? getItemStringName(value) : ''}
                setQuery={setQ}
                placeholder={placeholder}
                getItemNameForMultipleValue={getItemName}
                removeValueInMultple={removeValueInMultple}
            />
            <Combobox.Options>
                {
                    isLoading ?
                        <div className='flex justify-center'>
                            <LoadIndicator />
                        </div>
                        :
                        !data?.length && !customValue ?
                            <div className='flex justify-center'>
                                No Data
                            </div> :

                            <>
                                {defaultOption}
                                {
                                    data.map((item, index) => (
                                        <Combobox.Option
                                            key={'item-' + index + getItemValue(item)}
                                            value={getItemValue(item)}
                                            name={getItemName(item)}
                                        />
                                    ))
                                }
                            </>
                }
            </Combobox.Options>
        </Combobox>
    )
}

AsyncSelect.propTypes = {
    url: PropTypes.string,
    onChange: PropTypes.func,
    isLoading: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}
