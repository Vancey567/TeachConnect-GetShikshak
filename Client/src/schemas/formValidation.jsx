import * as Yup from 'yup'
const SUPPORTED_FORMATS =["image/jpg","image/jpeg","image/png","image/avif"];

export const RegisterSchema=Yup.object({
    email:Yup.string().email("Please enter a valid mail").required("Email is required"),
    password:Yup.string().min(6).required("Password is required"),
    confirmPassword:Yup.string().required().oneOf([Yup.ref("password"),null],"Password must match"),
    role:Yup.string().required()
})

export const LoginSchema=Yup.object({
    email:Yup.string().email("Please enter a valid mail").required("Email is required"),
    password:Yup.string().min(6).required("Password is required"),
})


export const subjectSchema=Yup.object({
    subjects:Yup.array()
    .required('Required!')
    .min(1,"Must choose atleast one!")
    .max(4,"Maximum 4 subjects allowed!")
})

export const titleSchema=Yup.object({
    title:Yup.string().required('Required!').test(3,"Must have at least 12 words!",value=>{
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount>=3;
    })
})

export const aboutClassSchema=Yup.object({
    aboutClass:Yup.string().required('Required!').test(3,"Must have at least 12 words!",value=>{
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount>=3;
    })
})

export const aboutYouSchema=Yup.object({
    aboutYou:Yup.string().required('Required!').test(3,"Must have at least 12 words!",value=>{
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount>=3;
    }),
    education:Yup.string().required("Required!"),
    age:Yup.number().required("Required"),
    gender:Yup.string().required("Required")
})

const phoneRegExp = /^(0|91)?[6-9][0-9]{9}$/

export const classDetailsSchema=Yup.object({
    city:Yup.string().required("Required Field!").min(1,"Required Field"),
    mode:Yup.array().required("Required Field!").min(1,"Required Field"),
    language:Yup.array().required("Required Field!").min(1,"Required Field"),
    rate:Yup.number().required("Required Field!"),
    phone:Yup.string().required("Required Field!").matches(phoneRegExp,"Phone number is not valid"),
})


export const DocumentUploadSchema=Yup.object({
    profilePic:Yup
    .mixed()
    .nullable()
    .required("Profile pic is required")
    .test(
        "FILE SIZE",
        "Uploaded file is too big.",
        (value)=>!value || (value && value.size <=5000*5000)
    )
    .test(
        "FILE_FORMAT",
        "Uploaded file has unsupported format.",
        (value)=>!value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
    identity:Yup
    .mixed()
    .nullable()
    // .required("Identity proof is required")
    .test(
        "FILE SIZE",
        "Uploaded file is too big.",
        (value)=>!value || (value && value.size <=5000*5000)
    )
    .test(
        "FILE_FORMAT",
        "Uploaded file has unsupported format.",
        (value)=>!value || (value && SUPPORTED_FORMATS.includes(value?.type))
    ),
    lastEducationalCertificate:Yup
    .mixed()
    .nullable()
    // .required("Education Details are required")
    .test(
        "FILE SIZE",
        "Uploaded file is too big.",
        (value)=>!value || (value && value.size <=5000*5000)
    )
    .test(
        "FILE_FORMAT",
        "Uploaded file has unsupported format.",
        (value)=>!value || (value && SUPPORTED_FORMATS.includes(value?.type))
    )
})

//  gender: "",
//     age: "",
//     phone:"",
//     address: "",
//     profilePic: "",
//     education:"",

export const StudentCompleteProfileSchema=Yup.object({
    gender:Yup.string().required("Required Field"),
    age:Yup.string().required("Required Field"),
    phone:Yup.string().required("Required Field").matches(phoneRegExp,"Phone number is not valid"),
    address:Yup.string().required("Required field"),
    education:Yup.string().required("Required Field"),
    profilePic:Yup.mixed().nullable().required("Profil picture is required").test("FILE SIZE",
    "Uploaded file is too big.",
    (value)=>!value || (value && value.size <=5000*5000)).test(
        "FILE_FORMAT",
        "Uploaded file has unsupported format.",
        (value)=>!value || (value && SUPPORTED_FORMATS.includes(value?.type))
    )
})