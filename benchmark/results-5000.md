# Benchmark Results

- **Iterations**: 5000
- **Warm-up**: 50
- **Date**: 2026-02-24T00:17:44.178Z

## Simple Conversion

### 24 hours → minutes

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0010 | 1.0M | 0.0013 | yes |
| nitro-measurements | 0.0016 | 615.5K | 0.0017 | yes |
| convert-units | 0.0278 | 36.0K | 0.0361 | yes |
| convert | 0.0008 | 1.3M | 0.0009 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.6x
- convert-units: 27.8x
- convert: 0.8x

### 4 inches → millimeters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0003 | 3.0M | 0.0004 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0009 | yes |
| convert-units | 0.0043 | 230.7K | 0.0048 | yes |
| convert | 0.0007 | 1.3M | 0.0009 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x
- convert-units: 13.0x
- convert: 2.3x

### 2.5 liters → cubic inches

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0003 | 3.4M | 0.0004 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0008 | yes |
| convert-units | 0.0171 | 58.5K | 0.0211 | yes |
| convert | 0.0008 | 1.3M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.4x
- convert-units: 58.5x
- convert: 2.6x

## Temperature (Non-linear)

### 100°C → °F

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0003 | 3.0M | 0.0004 | yes |
| nitro-measurements | 0.0007 | 1.3M | 0.0009 | yes |
| convert-units | 0.0240 | 41.7K | 0.0281 | yes |
| convert | 0.0008 | 1.3M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.2x
- convert-units: 71.9x
- convert: 2.4x

### 451°F → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.7M | 0.0004 | yes |
| nitro-measurements | 0.0008 | 1.3M | 0.0009 | yes |
| convert-units | 0.0240 | 41.6K | 0.0280 | yes |
| convert | 0.0008 | 1.3M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x
- convert-units: 64.1x
- convert: 2.1x

### 0 K → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.7M | 0.0004 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0009 | yes |
| convert-units | 0.0235 | 42.6K | 0.0277 | yes |
| convert | 0.0008 | 1.3M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.9x
- convert-units: 62.7x
- convert: 2.0x

## Batch Conversion

### km→mi × 100

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0195 | 51.4K | 0.0238 | yes |
| nitro-measurements | 0.0576 | 17.4K | 0.0631 | yes |
| convert-units | 0.4782 | 2.1K | 0.5581 | yes |
| convert | 0.0615 | 16.2K | 0.0661 | yes |

*Relative to Raw Math:*
- nitro-measurements: 3.0x
- convert-units: 24.6x
- convert: 3.2x

### km→mi × 1000

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.1980 | 5.0K | 0.2215 | yes |
| nitro-measurements | 0.5648 | 1.8K | 0.5846 | yes |
| convert-units | 4.7867 | 209 | 4.9025 | yes |
| convert | 0.6164 | 1.6K | 0.7024 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.9x
- convert-units: 24.2x
- convert: 3.1x

## Arithmetic

### 1 km + 500 m → meters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0010 | 1.0M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.3x

### 10 lb − 3 kg → pounds

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0010 | 1.0M | 0.0012 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.4x
