import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form,FormGroup, Label, Input, Button, Card, CardHeader, CardBody, FormFeedback } from "reactstrap";

const initialValues={
    email:"",
    password:"",
    terms:false
};

const errorMessages ={
    email:"Geçerli bir email adresi giriniz.",
    password:"En az 8 karakter, en az bir büyük harf, en az bir bir küçük harf, en az bir sembol ve en az bir rakam içermelidir.",
    terms:"Şartları kabl etmelisiniz."
};

export default function Login() {
    const history = useHistory();
    const [formData, setFormData] = useState(initialValues);
    const[errors, setErrors] = useState({
        email:false,
        password:false,
        terms:false
    });
    const[isValid, setIsValid] = useState(false);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };
    function checkPassword(password){
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    useEffect(() => {
        setErrors({
            email: !validateEmail(formData.email),
            password: !checkPassword(formData.password),
            terms: !formData.terms
        });

        setIsValid(validateEmail(formData.email) && checkPassword(formData.password) && formData.terms);
    }, [formData]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });

        if (name === "email") {
            setErrors({ ...errors, [name]: !validateEmail(value) });
        } else if (name === "password") {
            setErrors({ ...errors, [name]: !checkPassword(value) });
        } else if (name === "terms") {
            setErrors({ ...errors, [name]: !checked });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isValid){
            history.push("/success");
        }
    }

    return (
        <Card>
            <CardHeader>Kayıt Ol</CardHeader>
            <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Kurumsal email adresinizi giriniz"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        invalid={errors.email}
                    />
                    {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Güçlü bir password seçiniz"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        invalid={errors.password}
                    />
                    {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for="terms">Şartları kabul ediyorum.</Label>
                    <Input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    onChange={handleChange}
                    checked={formData.terms}
                    invalid={errors.terms}
                    />
                    {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
                </FormGroup>
                <Button disabled={!isValid}>Login</Button>
            </Form>
            </CardBody>
        </Card>
    )
}