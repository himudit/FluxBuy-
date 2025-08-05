import React from 'react';

const brands = [
    { name: 'Adidas', logo: '/brand/addidas.jpg' },
    { name: 'Nestle', logo: '/brand/nestle.png' },
    { name: 'Drpepper', logo: '/brand/dr-pepper.png' },
    { name: 'LG Electronics', logo: '/brand/LG_logo_(2014).png' },
    { name: 'Dell', logo: '/brand/Dell-Logo.png' },
    { name: 'Apple', logo: '/brand/Apple-Logo.png' },
    { name: 'Chanel', logo: '/brand/chanel.png' },
    { name: 'Zara Fashion', logo: '/brand/zara.jpg' },
];

const ExploreBrand = () => {
    return (
        <section className="py-10 px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Explore Official Brand Stores
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl flex items-center gap-4 shadow hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-14 h-14 object-contain rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{brand.name}</h3>
                            <p className="text-sm text-gray-500">Delivery within 24 hours</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExploreBrand;
