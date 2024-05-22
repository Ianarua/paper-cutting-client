import { useState, useEffect, FC } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';

export interface IFormField {
    name: string;
    label: string;
    maxLength?: number;
    required?: boolean;
}

interface IProps {
    formConfig: IFormField[];
    formData: { [key: string]: string | number };
    isEditable: boolean;
    onInputChange: (fieldName: string, value: string) => void;
    verifiedPassedFunc: (isPass: boolean) => void;
}

const Form: FC<IProps> = ({ formConfig, formData, isEditable, onInputChange, verifiedPassedFunc }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const newErrors: { [key: string]: string } = {};
        let isPass: boolean = true;
        formConfig.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = '不能为空';
                isPass = false;
            }
        });
        verifiedPassedFunc(isPass);
        setErrors(newErrors);
    }, [formData, formConfig]);

    return (
        <View>
            { formConfig.map((field, index) => (
                <View key={ index } style={ styles.formItem }>
                    <Text style={ styles.label }>{ field.label }: </Text>
                    <View style={ styles.inner }>
                        <TextInput
                            maxLength={ field.maxLength }
                            style={ [styles.input, errors[field.name] ? styles.inputError : null] }
                            value={ String(formData[field.name]) }  // 确保值为 string 类型
                            editable={ isEditable }
                            onChangeText={ (value) => onInputChange(field.name, value) }
                        />
                        <View style={ { flex: 1, marginLeft: 7 } }>
                            { errors[field.name] && <Text style={ styles.errorText }>{ errors[field.name] }</Text> }
                        </View>
                    </View>
                </View>
            )) }
        </View>
    );
};

const styles = StyleSheet.create({
    formItem: {
        width: '100%',
        height: 50,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        width: '20%',
        paddingLeft: 5,
        marginBottom: 15
    },
    inner: {
        flex: 1,
        // backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'space-around'
    },
    input: {
        // flex: 1,
        height: '60%',
        padding: 0,
        paddingLeft: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 15
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default Form;
