module.exports = {
        name: 'DB',
        tables: [
            {
                name: 'store',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT utf8_unicode_ci'},
                    {name: 'address', type: 'TEXT utf8_unicode_ci'},
                    {name: 'icon', type: 'TEXT utf8_unicode_ci'},
                    {name: 'tel', type: 'TEXT utf8_unicode_ci'}
                ]
            },
            {
                name: 'category',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT utf8_unicode_ci'},
                    {name: 'icon', type: 'TEXT utf8_unicode_ci'}
                ]
            },
            {
                name: 'product',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'categoryID', type: 'INT'},
                    {name: 'name', type: 'TEXT utf8_unicode_ci'},
                    {name: 'icon', type: 'TEXT utf8_unicode_ci'},
                    {name: 'image', type: 'TEXT utf8_unicode_ci'},
                    {name: 'price', type: 'INT'}
                ]
            },
            {
                name: 'orders',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'storeID', type: 'INT utf8_unicode_ci'},
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
                    {name: 'query', type: 'TEXT  utf8_unicode_ci'},
                    {name: 'bindings', type: 'TEXT  utf8_unicode_ci'},
                    {name: 'timestamp', type: 'BIGINT'}
                ]
            }
        ]
    }