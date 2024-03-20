import useAuth from "@/lib/useAuth";

const LogoutButton = () => {
    const { signOut } = useAuth();
    return <button onClick={signOut}>ログアウト</button>
}

export default LogoutButton;
