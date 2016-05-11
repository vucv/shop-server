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
                    {name: 'categoryID', type: 'TEXT'},
                    {name: 'name', type: 'TEXT'},
                    {name: 'icon', type: 'TEXT'},
                    {name: 'image', type: 'TEXT'},
                    {name: 'total', type: 'INTEGER'},
                    {name: 'available', type: 'INTEGER'},
                    {name: 'price', type: 'INTEGER'},
                    {name: 'priceCore', type: 'INTEGER'}
                ]
            },
            {
                name: 'orders',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'storeID', type: 'TEXT'},
                    {name: 'type', type: 'INTEGER'},
                    {name: 'date', type: 'BIGINT'},
                    {name: 'price', type: 'INTEGER'},
                    {name: 'total', type: 'INTEGER'}
                ]
            },
            {
                name: 'order_detail',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'ordersID', type: 'TEXT'},
                    {name: 'productID', type: 'TEXT'},
                    {name: 'total', type: 'INTEGER'},
                    {name: 'priceCore', type: 'INTEGER'},
                    {name: 'price', type: 'INTEGER'}
                ]
            },
            {
                name: 'sale',
                columns: [
                    {name: 'ID', type: 'TEXT'},
                    {name: 'date', type: 'BIGINT'},
                    {name: 'productID', type: 'INTEGER'},
                    {name: 'total', type: 'INTEGER'},
                    {name: 'priceCore', type: 'INTEGER'},
                    {name: 'price', type: 'INTEGER'}
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