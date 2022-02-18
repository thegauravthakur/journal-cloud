import { format } from 'date-fns';
import * as React from 'react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';

import { DateContext } from '../../App';
import { CustomCalendar } from './CustomCalendar';
import { TextInputField } from './TextInputField';

interface TimelineHeaderProps {
    isLoading: boolean;
    hasData: boolean;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}
export function TimelineHeader({
    isLoading,
    hasData,
    showModal,
    setShowModal,
}: TimelineHeaderProps) {
    const { currentDate } = useContext(DateContext);
    return (
        <>
            <Ripple
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}
                onPress={() => {
                    setShowModal(true);
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        marginHorizontal: 10,
                        marginVertical: 20,
                    }}
                >
                    {format(new Date(currentDate), 'EEEE do, yyyy')}
                </Text>
            </Ripple>
            <TextInputField isLoading={isLoading} />
            {!hasData && !isLoading && (
                <Text
                    style={{ fontWeight: '400', fontSize: 18, marginLeft: 15 }}
                >
                    No Events Found!
                </Text>
            )}
            <Modal
                animationInTiming={1}
                animationOutTiming={1}
                isVisible={showModal}
                onBackdropPress={() => setShowModal(false)}
                onBackButtonPress={() => setShowModal(false)}
            >
                <CustomCalendar setShowModal={setShowModal} />
            </Modal>
        </>
    );
}
