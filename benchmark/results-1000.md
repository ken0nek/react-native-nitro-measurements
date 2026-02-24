# Benchmark Results

- **Iterations**: 1000
- **Warm-up**: 50
- **Date**: 2026-02-24T00:16:55.806Z

## Simple Conversion

### 24 hours → minutes

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0010 | 1.0M | 0.0010 | yes |
| nitro-measurements | 0.0017 | 585.1K | 0.0021 | yes |
| convert-units | 0.0341 | 29.3K | 0.0481 | yes |
| convert | 0.0009 | 1.1M | 0.0009 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.8x
- convert-units: 35.6x
- convert: 0.9x

### 4 inches → millimeters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0010 | 959.8K | 0.0011 | yes |
| convert-units | 0.0050 | 201.7K | 0.0063 | yes |
| convert | 0.0008 | 1.3M | 0.0011 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.5x
- convert-units: 11.9x
- convert: 1.8x

### 2.5 liters → cubic inches

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 2.0M | 0.0005 | yes |
| nitro-measurements | 0.0008 | 1.3M | 0.0011 | yes |
| convert-units | 0.0222 | 45.0K | 0.0292 | yes |
| convert | 0.0007 | 1.4M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.6x
- convert-units: 44.4x
- convert: 1.4x

## Temperature (Non-linear)

### 100°C → °F

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0003 | 3.0M | 0.0005 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0010 | yes |
| convert-units | 0.0280 | 35.7K | 0.0345 | yes |
| convert | 0.0008 | 1.2M | 0.0009 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x
- convert-units: 84.1x
- convert: 2.5x

### 451°F → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0010 | yes |
| convert-units | 0.0281 | 35.6K | 0.0317 | yes |
| convert | 0.0008 | 1.3M | 0.0009 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.7x
- convert-units: 67.4x
- convert: 1.9x

### 0 K → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.7M | 0.0004 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0010 | yes |
| convert-units | 0.0256 | 39.1K | 0.0309 | yes |
| convert | 0.0008 | 1.3M | 0.0008 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.9x
- convert-units: 68.2x
- convert: 2.1x

## Batch Conversion

### km→mi × 100

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0205 | 48.9K | 0.0245 | yes |
| nitro-measurements | 0.0533 | 18.7K | 0.0597 | yes |
| convert-units | 0.4740 | 2.1K | 0.5545 | yes |
| convert | 0.0613 | 16.3K | 0.0661 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.6x
- convert-units: 23.2x
- convert: 3.0x

### km→mi × 1000

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.1964 | 5.1K | 0.2170 | yes |
| nitro-measurements | 0.5577 | 1.8K | 0.5780 | yes |
| convert-units | 4.7958 | 209 | 4.8872 | yes |
| convert | 0.6233 | 1.6K | 0.7039 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.8x
- convert-units: 24.4x
- convert: 3.2x

## Arithmetic

### 1 km + 500 m → meters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0004 | 2.4M | 0.0005 | yes |
| nitro-measurements | 0.0009 | 1.1M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.1x

### 10 lb − 3 kg → pounds

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 1.8M | 0.0005 | yes |
| nitro-measurements | 0.0013 | 774.0K | 0.0014 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.4x
