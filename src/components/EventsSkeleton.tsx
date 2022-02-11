import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';

export const EventsSkeleton = (props: any) => (
    <ContentLoader
        speed={4}
        width={476}
        height={524}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        {...props}
    >
        <Rect x='50' y='11' rx='3' ry='3' width='126' height='13' />
        <Rect x='50' y='43' rx='3' ry='3' width='410' height='13' />
        <Rect x='50' y='94' rx='3' ry='3' width='380' height='13' />
        <Rect x='50' y='69' rx='3' ry='3' width='178' height='13' />
        <Circle cx='22' cy='20' r='17' />
        {/* <Rect x='167' y='227' rx='0' ry='0' width='213' height='5' /> */}
        <Rect x='19' y='45' rx='0' ry='0' width='5' height='80' />

        <Rect x='50' y='156' rx='3' ry='3' width='126' height='13' />
        <Rect x='50' y='188' rx='3' ry='3' width='410' height='13' />
        <Rect x='50' y='239' rx='3' ry='3' width='380' height='13' />
        <Rect x='50' y='214' rx='3' ry='3' width='178' height='13' />
        <Circle cx='22' cy='165' r='17' />
    </ContentLoader>
);
