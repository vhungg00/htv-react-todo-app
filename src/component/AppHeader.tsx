import React from "react";
import {Button, SelectButton} from '@/component/Button';
import styles from '@/styles/modules/app.module.scss';
import {useAppSelector} from "@/store/slices/hook";
import {RootState} from "@/store";

export const AppHeader: React.FC = () => {
    const optionListSelectButton = [
        {id: '001', title: 'all'},
        {id: '002', title: 'InComplete'},
        {id: '003', title: 'Complete'},
    ]

    const filterStatus = useAppSelector((state: RootState) => state.todo.filterStatus);

    return (
        <div className={styles.appHeader}>
            <Button type='button'>Add Task</Button>
            <SelectButton selectButtonId="status" value={filterStatus}>
                {optionListSelectButton.map((temp) => (
                    <option key={temp.id} value={temp.id}>{temp.title}</option>
                ))}
            </SelectButton>
        </div>
    )
};