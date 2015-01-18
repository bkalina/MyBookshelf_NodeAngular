angular.module('ebookService', [])

    .service('Ebooks', function ($http) {
        return {
            get: function (id) {
                return $http.get('http://it-ebooks-api.info/v1/book/' + id);
            },
            create: function (id) {
                return $http.get('http://it-ebooks-api.info/v1/book/' + id)
                    .success(function (data) {
                        $http.post('/api/books', data)
                            .success(function (data) {
                                $http.get('/api/books')
                            });
                    });
            },
            search: function (query) {
                return $http.get('http://it-ebooks-api.info/v1/search/' + query);
            }
        }
    });