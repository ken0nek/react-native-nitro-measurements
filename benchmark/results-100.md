# Benchmark Results

- **Iterations**: 100
- **Warm-up**: 50
- **Date**: 2026-02-24T00:15:29.263Z

## Simple Conversion

### 24 hours → minutes

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0011 | 922.4K | 0.0011 | yes |
| nitro-measurements | 0.0020 | 510.7K | 0.0021 | yes |
| convert-units | 0.0534 | 18.7K | 0.0573 | yes |
| convert | 0.0008 | 1.3M | 0.0008 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.8x
- convert-units: 49.3x
- convert: 0.7x

### 4 inches → millimeters

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0007 | 1.4M | 0.0008 | yes |
| nitro-measurements | 0.0010 | 960.7K | 0.0011 | yes |
| convert-units | 0.0059 | 170.2K | 0.0061 | yes |
| convert | 0.0009 | 1.1M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.5x
- convert-units: 8.3x
- convert: 1.3x

### 2.5 liters → cubic inches

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0007 | 1.4M | 0.0008 | yes |
| nitro-measurements | 0.0007 | 1.4M | 0.0008 | yes |
| convert-units | 0.0156 | 63.9K | 0.0464 | yes |
| convert | 0.0007 | 1.4M | 0.0008 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.0x
- convert-units: 22.1x
- convert: 1.0x

## Temperature (Non-linear)

### 100°C → °F

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0008 | 1.3M | 0.0008 | yes |
| nitro-measurements | 0.0009 | 1.2M | 0.0010 | yes |
| convert-units | 0.0226 | 44.3K | 0.0662 | yes |
| convert | 0.0017 | 585.5K | 0.0018 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.1x
- convert-units: 28.5x
- convert: 2.2x

### 451°F → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0007 | 1.5M | 0.0010 | yes |
| nitro-measurements | 0.0015 | 666.6K | 0.0016 | yes |
| convert-units | 0.0540 | 18.5K | 0.0598 | yes |
| convert | 0.0011 | 923.2K | 0.0012 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.2x
- convert-units: 81.0x
- convert: 1.6x

### 0 K → °C

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0005 | 2.0M | 0.0005 | yes |
| nitro-measurements | 0.0014 | 727.2K | 0.0015 | yes |
| convert-units | 0.0323 | 30.9K | 0.0505 | yes |
| convert | 0.0013 | 750.2K | 0.0014 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.8x
- convert-units: 64.6x
- convert: 2.7x

## Batch Conversion

### km→mi × 100

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.0194 | 51.6K | 0.0475 | yes |
| nitro-measurements | 0.0639 | 15.6K | 0.1148 | yes |
| convert-units | 0.4844 | 2.1K | 0.5643 | yes |
| convert | 0.0616 | 16.2K | 0.0669 | yes |

*Relative to Raw Math:*
- nitro-measurements: 3.3x
- convert-units: 25.0x
- convert: 3.2x

### km→mi × 1000

| Library | Median (ms) | Ops/sec | p95 (ms) | Correct |
|---------|-------------|---------|----------|---------|
| Raw Math | 0.1915 | 5.2K | 0.2118 | yes |
| nitro-measurements | 0.5631 | 1.8K | 0.5772 | yes |
| convert-units | 4.8094 | 208 | 4.8760 | yes |
| convert | 0.6163 | 1.6K | 0.6999 | yes |

*Relative to Raw Math:*
- nitro-measurements: 2.9x
- convert-units: 25.1x
- convert: 3.2x

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
| Raw Math | 0.0005 | 1.8M | 0.0006 | yes |
| nitro-measurements | 0.0010 | 1.0M | 0.0010 | yes |

*Relative to Raw Math:*
- nitro-measurements: 1.8x
