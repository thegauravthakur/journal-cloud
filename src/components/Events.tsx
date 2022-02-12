import firestore from '@react-native-firebase/firestore';
import * as React from 'react';
import { View } from 'react-native';
import { useQuery } from 'react-query';

import { Response } from '../views/Timeline';
import { EventItem } from './EventItem';
import { EventsSkeleton } from './EventsSkeleton';

export function Events() {
    const { isLoading, data } = useQuery('fetchEvents', async () => {
        const { _data } = (await firestore()
            .collection('user')
            .doc('10-02-2022')
            .get()) as unknown as { _data: Response };
        return _data;
    });

    const sortedKeys = data
        ? Object.keys(data).sort(
              (key1: string, key2: string) =>
                  (data[key2].createdAt as number) -
                  (data[key1].createdAt as number)
          )
        : [];

    return (
        <View>
            {!isLoading && data ? (
                sortedKeys.map((id, index) => (
                    <EventItem
                        key={id}
                        isLastItem={Object.keys(data).length === index + 1}
                        title={data[id].title as string}
                        description={data[id].description as string}
                        id={id}
                        createdAt={data[id].createdAt as number}
                    />
                ))
            ) : (
                <EventsSkeleton />
            )}
        </View>
    );
}
