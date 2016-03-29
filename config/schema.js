module.exports = {
        name: 'DB',
        tables: [
            {
                name: 'store',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT'},
                    {name: 'address', type: 'TEXT'},
                    {name: 'icon', type: 'TEXT'},
                    {name: 'tel', type: 'TEXT'}
                ]
            },
            {
                name: 'category',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT'},
                    {name: 'icon', type: 'TEXT'}
                ]
            },
            {
                name: 'product',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'categoryID', type: 'INT'},
                    {name: 'name', type: 'TEXT'},
                    {name: 'icon', type: 'TEXT'},
                    {name: 'image', type: 'TEXT'},
                    {name: 'price', type: 'INT'}
                ]
            },
            {
                name: 'orders',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'storeID', type: 'INT'},
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
                    {name: 'query', type: 'TEXT'},
                    {name: 'bindings', type: 'TEXT'},
                    {name: 'timestamp', type: 'BIGINT'}
                ]
            }
        ]
    }