import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Combobox } from '.'
import LoadIndicator from '../LoadIndicator';

export const SearchableSelect = ({ data, bindBy = undefined, customValue = false, defaultOption = null, value, onChange, placeholder = '', isLoading = false, itemValueAccessor = null, itemNameAccessor = null, label = null, multiple = false }) => {

	const [q, setQ] = useState('');

	const rows = useMemo(() => {
		if (!data) {
			return [];
		}

		let rows = [];

		if (!q) {
			rows = [...data];
			rows.length = rows.length > 31 ? 31 : rows.length;
			return rows;
		}

		let terms = q.split(' ').filter(Boolean)
			.map(val => val.replace(/[^a-zA-Z0-9]/, ''))
			.join('|');

		let exp = new RegExp(terms, 'gi');

		for (const item of data) {
			if (rows.length > 31) {
				break;
			}

			if (exp.test(getItemName(item))) {
				rows.push(item);
				continue;
			}
		}

		return rows
	}, [q, data]);

	function getItemValue(item) {
		if (typeof itemValueAccessor === 'function') {
			return itemValueAccessor(item);
		}

		return itemValueAccessor === null ?
			item : item[itemValueAccessor];
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
		<Combobox by={bindBy} value={value} onChange={onChange} multiple={multiple}>
			<Combobox.Input
				multiple={multiple}
				label={label}
				value={multiple ? value : value ? getItemName(value) : ''}
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
						!rows.length && !customValue ?
							<div className='flex justify-center'>
								No Data
							</div> :
							<>
								{defaultOption}
								{
									rows.map((item, index) => (
										<Combobox.Option
											key={'item-' + index + getItemValue(item)}
											value={getItemValue(item)}
											name={getItemName(item)}
										/>
									))
								}
							</>
				}
				{
					q.length > 0 && customValue && (
						<Combobox.Option value={q} name={
							<div className='flex items-center gap-1'>
								<span className='text-xs'>use</span>
								<span className='text-yellow-800'> {`"${q}"`} </span>
							</div>
						} />

					)
				}
			</Combobox.Options>
		</Combobox>
	)
}

SearchableSelect.propTypes = {
	data: PropTypes.array,
	onChange: PropTypes.func,
	isLoading: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}
