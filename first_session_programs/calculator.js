
const appendToDisplay = (value) => {
    document.getElementById('display').value += value;
};

const calculateResult = () => {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        alert("Invalid operation!");
    }
};

const cleardisplay = () => {
    document.getElementById('display').value = "";
};