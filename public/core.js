var mybookshelf = angular.module('bookshelf', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.myQuery = '';
    $scope.eQuery = '';

    $http.get('/api/books')
        .success(function (data) {
            $scope.books = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createBook = function () {
        $http.post('/api/books', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                $scope.books = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    $scope.deleteBook = function (id) {
        $http.delete('/api/books/' + id)
            .success(function (data) {
                $scope.books = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

}