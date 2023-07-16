import { ChangeEvent, useState } from 'react';

import './form.scss';

const Form: React.FC = () => {

    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState('');

    const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setStrength(calculatePasswordStrength(value));
    }

    const calculatePasswordStrength = (value: string): string => {

        const hasLetters = /[a-zA-Z]/.test(value);
        const hasNumbers = /[0-9]/.test(value);
        const hasSymbols = /[=/\()%ยง!@#$%^&*]/.test(value);

        let conditionKey = '';

        const conditions: Record<string, string> = {
            '': 'gray',
            shortPass: 'red',
            weak: 'red',
            medium: 'yellow',
            strong: 'green',
        };

        if (value.length === 0) {
            conditionKey = '';
        } else if (value.length < 8) {
            conditionKey = 'shortPass';
        } else if (hasLetters && hasNumbers && hasSymbols) {
            conditionKey = 'strong';
        } else if (
            (hasLetters && hasNumbers) ||
            (hasLetters && hasSymbols) ||
            (hasNumbers && hasSymbols)
        ) {
            conditionKey = 'medium';
        } else {
            conditionKey = 'weak';
        }
        return conditions[conditionKey];
    };

    const getColor = (sectionIndex: number): string => {

        const colors: Record<string, string> = {
            gray: 'gray',
            red: 'red',
            yellow: 'yellow',
            green: 'green',
        };

        if (password.length === 0) {
            return colors.gray;
        } else if (password.length < 8) {
            return colors.red;
        } else if (strength === 'green') {
            return colors.green;
        } else if (strength === 'yellow' && sectionIndex < 2) {
            return colors.yellow;
        } else if (strength === 'red' && sectionIndex < 1) {
            return colors.red;
        } else {
            return colors.grey;
        }
    };

    return (
        <div className="password__form">
            <input
                type="password"
                className="password__form-input"
                name="password"
                value={password}
                onChange={updatePassword}
                placeholder='Test your password here . . .'
            />
            <div className="password__form-strength-lines">
                <div className={`line bg-${getColor(0)}`}></div>
                <div className={`line bg-${getColor(1)}`}></div>
                <div className={`line bg-${getColor(2)}`}></div>
            </div>
        </div>
    );
}

export default Form;