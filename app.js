//budgetController
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Create ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0
            }
            //Create newItem
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Add data in stroage
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },
        test: function () {
            console.log(data);
        }


    };

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

    var setupEventListeners = function () {
        var DOM = UICtr.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }



    var ctrlAddItem = function () {
        var input, newItem;

        //filed input value
        input = UICtr.getInput();

        //Add item to storage
        newItem = budgetCtr.addItem(input.type, input.description, input.value);
    };
    return {
        init: function () {
            console.log('init has run.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);


Controller.init();