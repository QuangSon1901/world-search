import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as httpRequest from '@/libs/httpRequest';
import { storage } from '@/libs/storage';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        notify: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload.ok) {
                    state.isAuthenticated = true;
                    state.user = payload.user;
                    state.loading = false;
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                    state.loading = false;
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload.ok) {
                    state.isAuthenticated = true;
                    state.user = payload.user;
                    state.loading = false;
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                    state.loading = false;
                }
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const { payload } = action;
                if (payload.ok) {
                    state.isAuthenticated = true;
                    state.user = payload.user;
                } else {
                    state.isAuthenticated = false;
                    state.user = null;
                }
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.loading = false;
            });
    },
});

const registerUser = createAsyncThunk('auth/registerUser', async (form) => {
    try {
        const res = await httpRequest.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, form);

        if (res.ok) {
            storage.set('ACCESS_TOKEN', res.access_token);
        }

        return res;
    } catch (error) {
        if (error.response.data) return error.response.data;
        return { status: 503, success: 'error', message: error.message };
    }
});

const loginUser = createAsyncThunk('auth/loginUser', async (form) => {
    try {
        const res = await httpRequest.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, form);

        if (res.ok) {
            storage.set('ACCESS_TOKEN', res.access_token);
        }

        return res;
    } catch (error) {
        if (error.response.data) return error.response.data;
        return { status: 503, success: 'error', message: error.message };
    }
});

const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    if (storage.get('ACCESS_TOKEN')) {
        const token = storage.get('ACCESS_TOKEN');

        try {
            const res = await httpRequest.post(
                `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            localStorage.removeItem('ACCESS_TOKEN');
            return res;
        } catch (error) {
            localStorage.removeItem(process.env.REACT_APP_TOKEN);
            if (error.response.data) return error.response.data;
            return { status: 503, success: 'error', message: error.message };
        }
    }
});

const getUser = createAsyncThunk('auth/getUser', async () => {
    if (!storage.get('ACCESS_TOKEN')) return { ok: false };
    const token = storage.get('ACCESS_TOKEN');

    try {
        const res = await httpRequest.get(`${process.env.NEXT_PUBLIC_API_URL}/user-info`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res;
    } catch (error) {
        localStorage.removeItem('ACCESS_TOKEN');
        if (error.response.data) return error.response.data;
        return { status: 503, success: 'error', message: error.message };
    }
});

export { registerUser, loginUser, logoutUser, getUser };
export default authSlice;
