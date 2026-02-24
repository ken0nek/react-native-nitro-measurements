# Benchmark Results

- **Iterations**: 500
- **Warm-up**: 50
- **Date**: 2026-02-24T00:20:04.726Z

## Simple Conversion

### 24 hours → minutes

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0014 | 706.2K | 0.0015 | yes |
| nitro-measurements | 0.0020 | 510.7K | 0.0021 | yes |
| convert-units | 0.0275 | 36.3K | 0.0530 | yes |
| convert | 0.0011 | 923.4K | 0.0012 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.4x
- convert-units: 19.5x
- convert: 0.8x

### 4 inches → millimeters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 2.0M | 0.0005 | yes |
| nitro-measurements | 0.0012 | 857.0K | 0.0012 | yes |
| convert-units | 0.0067 | 150.0K | 0.0069 | yes |
| convert | 0.0012 | 857.0K | 0.0012 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.3x
- convert-units: 13.3x
- convert: 2.3x

### 2.5 liters → cubic inches

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0006 | 1.6M | 0.0007 | yes |
| nitro-measurements | 0.0013 | 750.2K | 0.0014 | yes |
| convert-units | 0.0244 | 41.0K | 0.0300 | yes |
| convert | 0.0011 | 923.2K | 0.0012 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x
- convert-units: 39.0x
- convert: 1.7x

## Temperature (Non-linear)

### 100°C → °F

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0006 | 1.6M | 0.0007 | yes |
| nitro-measurements | 0.0013 | 749.7K | 0.0014 | yes |
| convert-units | 0.0339 | 29.5K | 0.0417 | yes |
| convert | 0.0010 | 1.0M | 0.0011 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x
- convert-units: 54.3x
- convert: 1.6x

### 451°F → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 2.0M | 0.0005 | yes |
| nitro-measurements | 0.0012 | 827.8K | 0.0013 | yes |
| convert-units | 0.0314 | 31.9K | 0.0374 | yes |
| convert | 0.0009 | 1.1M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.4x
- convert-units: 62.8x
- convert: 1.8x

### 0 K → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 2.2M | 0.0005 | yes |
| nitro-measurements | 0.0008 | 1.2M | 0.0009 | yes |
| convert-units | 0.0291 | 34.4K | 0.0336 | yes |
| convert | 0.0009 | 1.1M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.8x
- convert-units: 63.5x
- convert: 1.9x

## Batch Conversion

### km→mi × 100

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0249 | 40.2K | 0.0275 | yes |
| nitro-measurements | 0.0588 | 17.0K | 0.0664 | yes |
| convert-units | 0.4692 | 2.1K | 0.5526 | yes |
| convert | 0.0616 | 16.2K | 0.0628 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.4x
- convert-units: 18.8x
- convert: 2.5x

### km→mi × 1000

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.1912 | 5.2K | 0.2165 | yes |
| nitro-measurements | 0.5565 | 1.8K | 0.5679 | yes |
| convert-units | 4.7484 | 211 | 4.8332 | yes |
| convert | 0.6174 | 1.6K | 0.7035 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.9x
- convert-units: 24.8x
- convert: 3.2x

## Arithmetic

### 1 km + 500 m → meters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0008 | 1.2M | 0.0011 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.0x

### 10 lb − 3 kg → pounds

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0006 | 1.7M | 0.0006 | yes |
| nitro-measurements | 0.0009 | 1.1M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.6x
