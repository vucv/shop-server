module.exports = {
        name: 'DB',
        tables: [
            {
                name: 'store',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT charset=utf8'},
                    {name: 'address', type: 'TEXT charset=utf8'},
                    {name: 'icon', type: 'TEXT charset=utf8'},
                    {name: 'tel', type: 'TEXT charset=utf8'}
                ]
            },
            {
                name: 'category',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT charset=utf8'},
                    {name: 'icon', type: 'TEXT charset=utf8'}
                ]
            },
            {
                name: 'product',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'categoryID', type: 'INT'},
                    {name: 'name', type: 'TEXT charset=utf8'},
                    {name: 'icon', type: 'TEXT charset=utf8'},
                    {name: 'image', type: 'TEXT charset=utf8'},
                    {name: 'price', type: 'INT'}
                ]
            },
            {
                name: 'orders',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'storeID', type: 'INT charset=utf8'},
                    {name: 'type', type: 'INT'},
                    {name: 'date', type: 'DATETIME'},
                    {name: 'note', type: 'TEXT'}
                ]
            },
            {
                name: 'order_detail',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'ordersID', type: 'INT'},
                    {name: 'productID', type: 'INT'},
                    {name: 'total', type: 'INT'},
                    {name: 'price', type: 'INT'}
                ]
            },
            {
                name: 'sale',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'date', type: 'INT'},
                    {name: 'productID', type: 'INT'},
                    {name: 'total', type: 'INT'},
                    {name: 'price', type: 'INT'}
                ]
            },
            {
                name: 'sync_info',
                columns: [
                    {name: 'query', type: 'TEXT  charset=utf8'},
                    {name: 'bindings', type: 'TEXT  charset=utf8'},
                    {name: 'timestamp', type: 'BIGINT'}
                ]
            }
        ]
    }