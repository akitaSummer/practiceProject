extern crate fern_sim;

use fern_sim::{run_simulation, Fern};
use std::time::Duration;

// cargo test --test unfurl
#[test]
fn test_run_simulation() {
    let mut fern = Fern {
        size: 1.0,
        growth_rate: 0.001,
    };
    run_simulation(&mut fern, 1000);
    assert_eq!(fern.size, 2.7169239322355985);
}
