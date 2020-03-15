//budgetController
var budgetController = (function () {
    //
    /* return {
        : function () {
            return;
        }
    } */
})();

//UIController
var UIController = (function () {

    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstring.inputType).value, //  inc  OR  exp
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value,
            };
        },

        getDOMstring: function () {
            return DOMstring;
        }
    };

})();


// Global appController
var Controller = (function (budgetCtr, UICtr) {
    var DOM = UICtr.getDOMstring();
    var ctrlAddItem = function () {
        //filed input value
        var input = UICtr.getInput();
        console.log(input);

    }


    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);