document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.querySelectorAll('.input-container');
    const radioContainer = document.querySelectorAll('.radio-container');

    inputContainer.forEach(container => {
        const numberInput = container.querySelector('.input-field');
        const icon = container.querySelector('.input-icon');

        numberInput.addEventListener('mouseover', () => {
            if (icon.classList.contains('left')){
                icon.classList.add('hoverd');
            } else {
                icon.classList.add('hovered');
            }  
        });

        numberInput.addEventListener('mouseout', () => {
            if (icon.classList.contains('left')){
                icon.classList.remove('hoverd');
            } else {
                icon.classList.remove('hovered');
            }
        });

        numberInput.addEventListener('focus', () => {
            if (icon.classList.contains('left')){
                icon.classList.add('focus');
            } else {
                icon.classList.add('focused');
            }
        });

        numberInput.addEventListener('blur', () => {
            if (icon.classList.contains('left')){
                icon.classList.remove('focus');
            } else {
                icon.classList.remove('focused');
            }
        });

        icon.addEventListener('mouseover', () => {
            if (icon.classList.contains('left')){
                numberInput.classList.add('hover');
            } else {
                numberInput.classList.add('hovered');
            }
        });

        icon.addEventListener('mouseout', () => {
            if (icon.classList.contains('left')){
                numberInput.classList.remove('hover');
            } else {
                numberInput.classList.remove('hovered');
            }
        });
    });

    radioContainer.forEach(container => {
        container.addEventListener('click', () => {
            const radio = container.querySelector('.radio');
            const customRadio = container.querySelector('.custom-radio');
            radio.checked = true;
            container.classList.add('active');
            customRadio.classList.add('active');
            radioContainer.forEach(item => {
                if (item !== container) {
                    item.classList.remove('active');
                    item.querySelector('.custom-radio').classList.remove('active');
                }
            });
        });
    });

    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
    
        // Retrieve form values
        const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
        const years = parseFloat(document.getElementById('years').value);
        const rate = parseFloat(document.getElementById('rate').value);
        const repayment = document.getElementById('repayment').checked;
        const interestOnly = document.getElementById('interest-only').checked;
    
        // Validate inputs
        let valid = true;
        if (isNaN(mortgageAmount) || mortgageAmount <= 0) {
            document.querySelector('.error-amount').classList.remove('hidden');
            valid = false;
        } else {
            document.querySelector('.error-amount').classList.add('hidden');
        }
        if (isNaN(years) || years <= 0) {
            document.querySelector('.error-years').classList.remove('hidden');
            valid = false;
        } else {
            document.querySelector('.error-years').classList.add('hidden');
        }
        if (isNaN(rate) || rate <= 0) {
            document.querySelector('.error-rate').classList.remove('hidden');
            valid = false;
        } else {
            document.querySelector('.error-rate').classList.add('hidden');
        }
        if (!repayment && !interestOnly) {
            document.querySelector('.error-type').classList.remove('hidden');
            valid = false;
        } else {
            document.querySelector('.error-type').classList.add('hidden');
        }
        if (!valid) return;
    
        // Calculate monthly payment
        let monthlyPayment = 0;
        const monthlyInterestRate = rate / 100 / 12;
        const numberOfPayments = years * 12;
    
        if (repayment) {
            // Repayment mortgage calculation
            monthlyPayment = mortgageAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);
        } else if (interestOnly) {
            // Interest-only mortgage calculation
            monthlyPayment = mortgageAmount * monthlyInterestRate;
        }
    
        // Display results
        document.querySelector('.empty').classList.add('hidden');
        document.querySelector('.full').classList.remove('hidden');
        document.getElementById('monthlyPay').innerText = `$${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        document.getElementById('totalPay').innerText = `$${(monthlyPayment * numberOfPayments).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    });

    document.getElementById('reset').addEventListener('click', () => {
        getStart();
    });

    function getStart(){
        document.getElementById('mortgage-amount').value = '';
        document.getElementById('years').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('repayment').checked = false;
        document.getElementById('interest-only').checked = false;
        document.querySelector('.empty').classList.remove('hidden');
        document.querySelector('.full').classList.add('hidden');
        radioContainer.forEach(container => {
            container.classList.remove('active');
            container.querySelector('.custom-radio').classList.remove('active');
        });
        document.querySelector('.error-amount').classList.add('hidden');
        document.querySelector('.error-years').classList.add('hidden');
        document.querySelector('.error-rate').classList.add('hidden');
        document.querySelector('.error-type').classList.add('hidden');

    }

    getStart();
});
