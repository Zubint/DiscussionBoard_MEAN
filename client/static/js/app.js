var boardApp = angular.module("boardApp", ["ngRoute", "ngMessages"]);

//custom filters.

boardApp.filter('sentenceCase', function() {
    return function(input, $scope) {
        var result ='';
        if (input != null && input != undefined){
            var words = input.split(' ');
            for(var i=0;i<words.length; i++){
                result = result.concat(words[i].substring(0,1).toUpperCase() + words[i].substring(1)+' ');
            }
        }
        return result;
    }
}),

boardApp.filter("zDate", function(){
  return function(input, $scope){
      var myDate=new Date(input);
      var month = myDate.getMonth();
      var day = myDate.getDate();
      var year = myDate.getFullYear();
      var strDate = "";
      // var day = date.toateString('dd-mmm-yyyy');

      // console.log(myDate, " " , day, " ", month, " ", year);
      switch (day){
        case 1 || 21:
        strSup="st";
        break;

        case 2 || 22:
        strSup="nd";
        break;

        case 3 || 33:
        strSup="rd";
        break;

        default:
        strSup="th";
      }

      var arrMonths=[];
      arrMonths[0]="January"
      arrMonths[1]="February"
      arrMonths[2]="March"
      arrMonths[3]="April"
      arrMonths[4]="May"
      arrMonths[5]="June"
      arrMonths[6]="July"
      arrMonths[7]="August"
      arrMonths[8]="September"
      arrMonths[9]="October"
      arrMonths[10]="November"
      arrMonths[11]="December"

      strDate = arrMonths[month]+ " " + day + strSup + " " + year;
      // strDate = date('dd'+strSup+'mmm-yyyy');

      // strDate = month.toString('mmm') + "-" day.toString("dd")+ strSup +"-" year;
      console.log(strDate);
      return strDate;
  }

});
