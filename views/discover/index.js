require('insert-css')(require('./index.css'));

module.exports = {
    id: 'discover',
    components: {
        tabBar: require('../../components/tabBar'),
        navigationBar: require('../../components/navigationBar'),
        discoverCell: require('../../components/discoverCell')
    },
    template: require('./index.html'),
    data: {
        personas: [
            {
                id: 1234,
                url: 'https://a.makes.org/lkjahsdf',
                name: 'Narrador',
                description: 'Lorem ipsum dolor sit amet.',
                user: {
                    name: 'Pedro',
                    location: 'Brazil',
                    description: 'Tour Guide'
                }
            }
        ]
    }
};