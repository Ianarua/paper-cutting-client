import React from 'react';
import CuttingIndex from './src/views/CuttingIndex.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/navigation.ts';

function App () {
    return (
        <NavigationContainer ref={ navigationRef }>
            <CuttingIndex/>
        </NavigationContainer>
    );
}

export default App;
