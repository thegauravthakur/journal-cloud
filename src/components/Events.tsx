import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { useQuery } from 'react-query';

import { DateContext } from '../../App';
import { Response } from '../views/Timeline';
import { EventItem } from './EventItem';
import { EventsSkeleton } from './EventsSkeleton';
import { TimelineHeader } from './TimelineHeader';

export function Events() {
    const { currentDate } = useContext(DateContext);
    const { currentUser } = auth();

    const { isLoading, data } = useQuery(
        ['fetchEvents', currentDate],
        async () => {
            if (currentUser) {
                const { _data } = (await firestore()
                    .collection(currentUser?.uid)
                    .doc(currentDate)
                    .get()) as unknown as { _data: Response };
                return _data;
            }
            return {};
        }
    );

    const sortedKeys = data
        ? Object.keys(data).sort(
              (key1: string, key2: string) =>
                  (data[key2].createdAt as number) -
                  (data[key1].createdAt as number)
          )
        : [];

    return (
        <View>
            <FlatList
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <TimelineHeader
                        hasData={sortedKeys.length > 0}
                        isLoading={isLoading}
                    />
                )}
                contentContainerStyle={{}}
                data={sortedKeys}
                renderItem={({ item, index }) =>
                    data ? (
                        <EventItem
                            isLastItem={Object.keys(data).length === index + 1}
                            id={item}
                            eventData={data[item]}
                        />
                    ) : null
                }
            />
            {isLoading && <EventsSkeleton />}
        </View>
    );
}
