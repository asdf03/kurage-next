import useAuth from "@/lib/useAuth";

const SignInEmail = () => {
    const { signInWithEmail, error } = useAuth();

    return (
        <div>
            <button onClick={signInWithEmail}>Emailでサインインする</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignInEmail;



