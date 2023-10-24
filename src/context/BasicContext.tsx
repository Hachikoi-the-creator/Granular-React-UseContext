"use client";
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

export type Attributes = {
    permissions: string[];
    visible_modules: VisibleModule[];
};

export type VisibleModule = {
    is_tool: boolean;
    label: string;
    name: string;
    route: string;
};

type UserState = {
    isLoggedIn: boolean;
    tools: VisibleModule[];
    csrfToken: string;
    email: string;
    ofuscadedNumber: string;
};

// * Actual context stuff
const initialState: UserState = {
    isLoggedIn: false,
    tools: [],
    csrfToken: "",
    email: "",
    ofuscadedNumber: "",
};

// isolated comp so it's easier to declare context type
function useStoreData() {
    const store = useState(initialState);
    return store;
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const store = useStoreData();
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

const Text = () => {
    const [store, setStore] = useContext(StoreContext)!;

    return (
        <div className="value">
            <input
                type="text"
                value={store.email}
                onChange={(e) => setStore({ ...store, email: e.target.value })}
            />
        </div>
    );
};

const Mirror = () => {
    const [store] = useContext(StoreContext)!;
    return <div className="value">{store.email}</div>;
};

const Container = () => {
    return (
        <div className="container border border-red-300">
            <h5>Container</h5>
            <Text />
            <Mirror />
        </div>
    );
};

function App() {
    return (
        <UserProvider>
            <div className="container">
                <Container />
            </div>
        </UserProvider>
    );
}

export default App;
