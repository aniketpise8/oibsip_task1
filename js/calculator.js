document.addEventListener('DOMContentLoaded', function () {
    const previewDisplay = document.getElementById('preview');
    const resultDisplay = document.getElementById('result');
    const historyDisplay = document.getElementById('history_item');

    const operatorMapping = {
        'x': '*',
        '%': '/100*',
        '÷': '/',
        '√': 'Math.sqrt'
    };

    let previousAnswer = 0;

    const actionButtons = document.querySelectorAll('#action-button button');
    actionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const buttonText = button.textContent;

            if (buttonText === 'ENTER') {
                try {
                    let expression = previewDisplay.textContent;
                    for (const specialChar in operatorMapping) {
                        expression = expression.split(specialChar).join(operatorMapping[specialChar]);
                    }
                    const result = eval(expression);
                    resultDisplay.textContent = result;
                    previousAnswer = result;

                    const historyEntry = document.createElement('div');
                    historyEntry.classList.add('history-entry');
                    const expressionDiv = document.createElement('div');
                    expressionDiv.classList.add('expression');
                    expressionDiv.textContent = expression;
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    resultDiv.textContent = result;

                    historyEntry.appendChild(expressionDiv);
                    historyEntry.appendChild(resultDiv);
                    historyDisplay.insertBefore(historyEntry, historyDisplay.firstChild);
                } catch (error) {
                    resultDisplay.textContent = 'Error';
                }
            } else if (buttonText === 'ans') {
                previewDisplay.textContent += previousAnswer;
            } else if (buttonText === 'del') {
                previewDisplay.textContent = previewDisplay.textContent.slice(0, -1);
            } else if (buttonText === 'clear') {
                previewDisplay.textContent = '';
                resultDisplay.textContent = '';
            } else {
                previewDisplay.textContent += buttonText;
            }
        });
    });

    const history = document.getElementById('history');
    history.addEventListener('click', function (event) {
        if (event.target.classList.contains('history-entry')) {
            const expression = event.target.querySelector('.expression').textContent;
            previewDisplay.textContent = expression;
        }
    });

    const trashButton = document.getElementById('trash');
    trashButton.addEventListener('click', function () {
        const historyEntries = document.querySelectorAll('.history-entry');
        historyEntries.forEach(function (entry) {
            entry.remove();
        });
    });
});
