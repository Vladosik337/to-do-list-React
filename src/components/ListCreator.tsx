import React from 'react';

const ListCreator = () => {
    return (
        <div className={'create-list'}>
            <label htmlFor="create-title">
                <input type="text" id={'create-title'} placeholder={'input Title'}/>
            </label>
            <ul>
                <li className={'text-amber-200 flex justify-between w-[300px]'}>
                    <textarea placeholder={'input task'}></textarea>
                    <button className={'text-amber-500 '}>Видалити</button>
                </li>
                <button className={'text-center w-full bg-[#FFFF]'}>Додати пункт</button>
            </ul>
        </div>
    );
};

export default ListCreator;
