let DummyData = JSON.parse(`[
    {
        "Id": 1,
        "Region": "CALABARZON",
        "Province": "CAVITE",
        "City": "SILANG",
        "Barangay": "BILUSO",
        "StreetAddress": "xxxx xxxxxxxx-yy somewhere st. zzzzz ave. Biluso, Silang, Cavite",
        "Description": "The Parker House is a timeless residence, seamlessly blending classic charm with modern comfort. Nestled in a tranquil setting, surrounded by lush gardens, this stately abode offers a warm and inviting atmosphere. It's a haven of refined living and gracious hospitality.",
        "Name": "Parker",
        "Type": "Residential",
        "Price": 2000000,
        "Storeys": 2,
        "LivableAreaSQM": 100,
        "GrossAreaSQM": 149,
        "LotLengthM": 10,
        "LotWidthM": 12,
        "LivingRoom": 1,
        "Kitchen": 1,
        "DiningRoom": 1,
        "BathRoom": 3,
        "Bedroom": 1,
        "MastersBedroom": 1,
        "MaidRoom": 1,
        "Toilet": 3,
        "WalkInCloset": 0,
        "Balcony": 1,
        "Lanai": 1,
        "CarPort": 1,
        "SampleImagesURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761436/homefinders/1-sample-image-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761447/homefinders/1-sample-image-1.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761459/homefinders/1-sample-image-2.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761470/homefinders/1-sample-image-3.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761481/homefinders/1-sample-image-4.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761491/homefinders/1-sample-image-5.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761501/homefinders/1-sample-image-6.png"
        ],
        "FloorPlansURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761513/homefinders/1-floor-plan-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761518/homefinders/1-floor-plan-1.png"
        ]
    },
    {
        "Id": 2,
        "Region": "CALABARZON",
        "Province": "CAVITE",
        "City": "SILANG",
        "Barangay": "BILUSO",
        "StreetAddress": "xxxx xxxxxxxx-yy somewhere st. 36 zzzzz ave SAMPLE-I. Biluso, Silang, Cavite",
        "Description": "The Harper House, a contemporary dwelling, boasts sleek design and modern flair. Situated in a trendy locale, this stylish residence offers a perfect fusion of comfort and sophistication. With its clean lines and thoughtfully curated interiors, the Harper House is a chic haven, inviting residents to embrace a lifestyle of modern elegance.",
        "Name": "Harper",
        "Type": "Residential",
        "Price": 1700000,
        "Storeys": 2,
        "LivableAreaSQM": 103,
        "GrossAreaSQM": 171.47,
        "LotLengthM": 10,
        "LotWidthM": 12,
        "LivingRoom": 0,
        "Kitchen": 1,
        "DiningRoom": 0,
        "BathRoom": 3,
        "Bedroom": 2,
        "MastersBedroom": 1,
        "MaidRoom": 1,
        "Toilet": 3,
        "WalkInCloset": 1,
        "Balcony": 2,
        "Lanai": 1,
        "CarPort": 1,
        "SampleImagesURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761697/homefinders/2-sample-image-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761700/homefinders/2-sample-image-1.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761702/homefinders/2-sample-image-2.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761706/homefinders/2-sample-image-3.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761710/homefinders/2-sample-image-4.png"
        ],
        "FloorPlansURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761714/homefinders/2-floor-plan-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705761716/homefinders/2-floor-plan-1.png"
        ]
    },
    {
        "Id": 3,
        "Region": "CALABARZON",
        "Province": "CAVITE",
        "City": "SILANG",
        "Barangay": "BILUSO",
        "StreetAddress": "xxxx xxxxxxxx-ZZ somewhere st. 38 zzzzz ave SAMPLE-II. Biluso, Silang, Cavite",
        "Description": "The Blanche House epitomizes timeless elegance in a tranquil setting. This exquisite residence seamlessly blends classic charm with comfort, creating a sanctuary of refined living and beauty.",
        "Name": "Blance",
        "Type": "Residential",
        "Price": 3000000,
        "Storeys": 2,
        "LivableAreaSQM": 101,
        "GrossAreaSQM": 154.05,
        "LotLengthM": 10,
        "LotWidthM": 12,
        "LivingRoom": 1,
        "Kitchen": 1,
        "DiningRoom": 1,
        "BathRoom": 3,
        "Bedroom": 2,
        "MastersBedroom": 1,
        "MaidRoom": 1,
        "Toilet": 3,
        "WalkInCloset": 0,
        "Balcony": 1,
        "Lanai": 1,
        "CarPort": 1,
        "SampleImagesURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762012/homefinders/3-sample-image-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762020/homefinders/3-sample-image-1.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762031/homefinders/3-sample-image-2.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762039/homefinders/3-sample-image-3.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762046/homefinders/3-sample-image-4.png"
        ],
        "FloorPlansURL": [
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762059/homefinders/3-floor-plan-0.png",
            "https://res.cloudinary.com/dqfelf82g/image/upload/v1705762068/homefinders/3-floor-plan-1.png"
        ]
    }
]`);

export default DummyData;
