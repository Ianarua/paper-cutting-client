import React from 'react';
import CuttingIndex from './src/views/CuttingIndex.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/navigation.ts';
// import { Provider } from '@fruits-chain/react-native-xiaoshu';
import { ConfigProvider } from '@pingtou/rn-vant';


function App () {
    return (
        <ConfigProvider>
            <NavigationContainer ref={ navigationRef }>
                <CuttingIndex/>
            </NavigationContainer>
        </ConfigProvider>
    );
}

export default App;
