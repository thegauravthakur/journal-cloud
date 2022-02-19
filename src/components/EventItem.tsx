import { Theme, useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useState } from 'react';
import {
    CameraRoll,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImageView from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { CustomTheme, StackParams } from '../../App';
import { EventType } from '../views/Timeline';
import { EventItemFooter } from './EventItemFooter';
import { EventItemWrapper } from './EventItemWrapper';

interface EventItemProps {
    eventData: EventType;
    isLastItem: boolean;
    id: string;
}

export function EventItem({ isLastItem, id, eventData }: EventItemProps) {
    const theme = useTheme() as Theme & { colors: CustomTheme };
    const { title, description, image, createdAt } = eventData;
    const [showImageViewer, setShowImageViewer] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();
    const onEventItemClick = async () => {
        navigation.navigate('AdvancedEvent', { id, eventData });
    };

    return (
        <EventItemWrapper
            iconName='edit'
            showBorderLine={!isLastItem}
            onClick={onEventItemClick}
        >
            <View style={{}}>
                {title.length > 0 && (
                    <Text
                        style={{
                            fontWeight: '700',
                            fontSize: 18,
                            color: theme.colors.eventTitle,
                        }}
                    >
                        {title}
                    </Text>
                )}
                {description.length > 0 && (
                    <Text
                        style={{
                            fontSize: 16,
                            fontFamily: 'segoeui',
                            lineHeight: 25,
                            color: theme.colors.eventDescription,
                        }}
                    >
                        {description}
                    </Text>
                )}
            </View>
            {image && (
                <TouchableOpacity
                    onPress={async () => {
                        setShowImageViewer(true);
                    }}
                >
                    <Image
                        source={{
                            uri: image,
                        }}
                        resizeMode='cover'
                        style={{
                            height: 180,
                            borderRadius: 15,
                            marginTop: 10,
                        }}
                    />
                </TouchableOpacity>
            )}
            <EventItemFooter createdAt={createdAt} />
            <Modal
                visible={showImageViewer}
                onRequestClose={() => setShowImageViewer(false)}
            >
                <ImageView
                    imageUrls={[{ url: image! }]}
                    enableSwipeDown
                    onSwipeDown={() => setShowImageViewer(false)}
                    renderHeader={() => (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                zIndex: 1000,
                                right: 20,
                                top: 20,
                            }}
                            onPress={() => CameraRoll.saveToCameraRoll(image!)}
                        >
                            <AntDesign
                                name={'closecircle'}
                                size={28}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    )}
                />
            </Modal>
        </EventItemWrapper>
    );
}
