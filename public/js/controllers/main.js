angular.module('mainController', [])

    .controller('bookController', function ($scope, Books, Ebooks) {
        $scope.formData = {};
        $scope.myQuery = '';
        $scope.eQuery = '';

        Books.get()
            .success(function (data) {
                $scope.books = data;
                console.log(data);
            });

        $scope.createBook = function () {
            Books.create($scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $scope.books = data;
                    console.log(data);
                });
        };

        $scope.deleteBook = function (id) {
            Books.delete(id)
                .success(function (data) {
                    $scope.books = data;
                    console.log(data);
                });
        };

        $scope.searchEbooks = function () {
            Ebooks.search($scope.eQuery)
                .success(function (data) {
                    $scope.ebooks = data.Books;
                    console.log(data);
                });
        };

        $scope.createEbook = function (id) {
            Ebooks.create(id)
                .success(function (data) {
                    Books.get()
                        .success(function (data) {
                            $scope.books = data;
                            console.log(data);
                        });
                    console.log(data);
                });
        };
    });