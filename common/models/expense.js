module.exports = function(Expense) {
    //Methd to get the category based expenses for the month
    Expense.getMonthlyCategoryBasedAnalysis = function(cb){
        ONE_MONTH = 30 * 24 * 60 * 60 * 100;
        var lastDate = new Date(Date.now() - ONE_MONTH);
        var result = "";
        var jsonArr = [];
        Expense.find({expensedate:{gt:lastDate}}, function(err, instance){
            var tempArr = [0,0,0,0];
            for(var i=0;i<instance.length;i++){
                if(instance[i].expensedate > lastDate){
                    if(instance[i].category == "Food"){
                        tempArr[0] = tempArr[0] + instance[i].price;
                    }
                    else if(instance[i].category == "Travel"){
                        tempArr[1] = tempArr[1] + instance[i].price;
                    }
                    else if(instance[i].category == "Education"){
                        tempArr[2] = tempArr[2] + instance[i].price;
                    }
                    else if(instance[i].category == "Miscellaneous"){
                        tempArr[3] = tempArr[3] + instance[i].price;
                    }
                }
            };

            for(var i=0; i < tempArr.length; i++){
                var cat = "";
                if(i == 0) cat = "Food";
                if(i == 1) cat = "Travel";
                if(i == 2) cat = "Education";
                if(i == 3) cat = "Miscellaneous";

                jsonArr.push({
                    "category":cat,
                    "expensedate":"LastMonth",
                    "price": tempArr[i]
                });
            }
            console.log("out is "+jsonArr);
            response = jsonArr;
            
            cb(null, response);
        });

    }
    
    Expense.remoteMethod('getMonthlyCategoryBasedAnalysis', {
        http: {path: '/getMonthlyCategoryBasedAnalysis', verb: 'get'},
        //accepts: {arg: 'categoryName', type: 'string', http: {source: 'query'}},
        returns: {arg: 'data', type: 'string'}
    });
};
