import { createSlice } from '@reduxjs/toolkit';
import { sampleCrypto } from '../../assets/sampleData';

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        assets: sampleCrypto,
    },
    reducers: {
        updatePrices: (state) => {
            state.assets = state.assets.map(asset => ({
                ...asset,
                price: (asset.price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2),
                percentChange1h: (Math.random() * 2 - 1).toFixed(2),
                percentChange24h: (Math.random() * 5 - 2.5).toFixed(2),
                volume24h: asset.volume24h + Math.floor(Math.random() * 1000000 - 500000)
            }));
        },
    },
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
