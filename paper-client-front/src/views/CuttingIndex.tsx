import { createStackNavigator } from '@react-navigation/stack';
import router from '../router';

/*
    只遍历Stack
 */
function CuttingIndex () {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            {
                router.map((item, index) => {
                    return (
                        <Stack.Screen
                            key={ index }
                            name={ item.name }
                            component={ item.component }
                            options={ {
                                // @ts-ignore
                                headerMode: 'none',
                                cardStyleInterpolator: undefined,
                            } }
                        />
                    );
                })
            }
        </Stack.Navigator>
    );

}

export default CuttingIndex;
