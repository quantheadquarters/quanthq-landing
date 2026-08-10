# QuantHQ Reproducibility Strategy

## Overview

QuantHQ is committed to reproducible research. All research papers include:
- Detailed methodology sections
- Data source specifications
- Code repository links
- Transaction cost assumptions
- Out-of-sample validation methodology

## Current Research Repositories

### Earnings Revision Momentum Decay
- **Repository:** https://github.com/quanthq/earnings-revision-momentum
- **Status:** Planned (pending actual code release)
- **Contents:** Factor construction, regime conditioning, walk-forward validation

### LLM Earnings Sentiment
- **Repository:** https://github.com/quanthq/llm-earnings-sentiment
- **Status:** Planned (pending actual code release)
- **Contents:** LLM prompts, sentiment extraction, factor construction

### Yield Curve Regime Classifier
- **Repository:** https://github.com/quanthq/yield-curve-regime-classifier
- **Status:** Planned (pending actual code release)
- **Contents:** HMM implementation, regime detection, factor rotation

## Reproducibility Checklist

For each research paper, we provide:

1. **Data Sources**
   - Exact data vendors and products
   - Sample periods
   - Universe definitions
   - Data quality filters

2. **Methodology**
   - Factor construction formulas
   - Regime detection algorithms
   - Backtesting methodology
   - Transaction cost models

3. **Code**
   - Data processing pipelines
   - Factor calculation scripts
   - Backtesting framework
   - Validation code

4. **Results**
   - Performance metrics
   - Robustness checks
   - Sensitivity analysis
   - Limitations

## Next Steps

To complete the reproducibility commitment:

1. **Create GitHub repositories** for each research paper
2. **Upload code** with clear documentation
3. **Add sample data** where licensing permits
4. **Create notebooks** demonstrating key results
5. **Add CI/CD** for automated testing
6. **Document setup** requirements and dependencies

## License

Research code will be released under MIT license. Data availability depends on vendor licensing terms.

## Contact

For questions about reproducibility, contact research@quanthq.in
