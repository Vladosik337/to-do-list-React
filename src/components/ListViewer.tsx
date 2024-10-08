import React from 'react';

const ListViewer = () => {
    return (
        <div className={'list mt-[30px]'}>
            <h3 className={'text-center'}>Title</h3>
            <ul>
                <li className={'text-amber-200 flex justify-between'}>
                    <input type="checkbox"/>
                    asdopasdahsidaosdp
                    <div className={'flex flex-col'}>
                        <button className={'text-amber-500 '}>Видалити</button>
                        <button className={'text-amber-500'}>Редагувати</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListViewer;
