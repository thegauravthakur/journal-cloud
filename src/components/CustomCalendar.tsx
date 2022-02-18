import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Calendar } from 'react-native-calendars';
import { useQuery } from 'react-query';

import { DateContext } from '../../App';

interface CustomCalendarProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
export function CustomCalendar({ setShowModal }: CustomCalendarProps) {
    const { currentDate, setCurrentDate } = useContext(DateContext);
    const convertedActiveDates: Record<string, Record<string, any>> = {};
    const { currentUser } = auth();
    const { data: activeDates } = useQuery(
        'fetchActiveDates',
        () =>
            new Promise<string[]>((resolve) => {
                if (currentUser)
                    firestore()
                        .collection(currentUser.uid)
                        .onSnapshot((snapshot) => {
                            const { docs } = snapshot;
                            resolve(docs.map((doc) => doc.id));
                        });
                else resolve([]);
            })
    );
    if (activeDates) {
        activeDates.forEach((date) => {
            convertedActiveDates[date] = { marked: true };
        });
    }

    convertedActiveDates[currentDate] = {
        ...convertedActiveDates[currentDate],
        selected: true,
    };

    return (
        <Calendar
            markedDates={convertedActiveDates}
            onDayPress={(date) => {
                setCurrentDate(date.dateString);
                setShowModal(false);
            }}
            style={{ borderRadius: 5 }}
            current={currentDate}
        />
    );
}
