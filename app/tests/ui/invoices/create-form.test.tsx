import {fireEvent, render} from '@testing-library/react';
import Form from '@/app/ui/invoices/create-form';
import {describe, expect, test} from '@jest/globals';
import {CustomerField} from "@/app/lib/definitions";

describe('Form component', () => {
    test('submit button should be disabled if any required field is empty', () => {
        const customers: CustomerField[] = [
            {id: "1", name: 'Customer 1'},
            {id: "2", name: 'Customer 2'}
        ];
        const {getByText, getByLabelText} = render(<Form customers={customers}/>);

        const submitButton = getByText('Create Invoice');
        expect(submitButton).toBeDisabled();

        // Select a customer
        fireEvent.change(getByLabelText('Choose customer'), {target: {value: '1'}});
        // Enter amount
        fireEvent.change(getByLabelText('Choose an amount'), {target: {value: '100'}});
        // Select status
        fireEvent.click(getByLabelText('Pending'));

        expect(submitButton).toBeEnabled();
    });

    test('submit button should have correct appearance based on enable/disable state', () => {
        const customers: CustomerField[] = [
            {id: "1", name: 'Customer 1'},
            {id: "2", name: 'Customer 2'}
        ];
        const {getByText, getByLabelText} = render(<Form customers={customers}/>);

        const submitButton = getByText('Create Invoice');

        // Check appearance when disabled
        expect(submitButton).toHaveClass('bg-gray-300 cursor-not-allowed');

        // Select a customer
        fireEvent.change(getByLabelText('Choose customer'), {target: {value: '1'}});
        // Enter amount
        fireEvent.change(getByLabelText('Choose an amount'), {target: {value: '100'}});
        // Select status
        fireEvent.click(getByLabelText('Pending'));

        // Check appearance when enabled
        expect(submitButton).toHaveClass('bg-blue-500 hover:bg-blue-600 text-white');
    });
});
