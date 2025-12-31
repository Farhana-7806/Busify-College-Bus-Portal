def calculate_bus_eta(distance_km, avg_speed_kmph, traffic_multiplier=1.0):
    """
    Calculate ETA (in hours) for a bus journey.

    :param distance_km: Distance in kilometers
    :param avg_speed_kmph: Average speed in km/h
    :param traffic_multiplier: Traffic factor (>1 means slower traffic)
    :return: ETA in hours
    """
    if distance_km < 0 or avg_speed_kmph <= 0 or traffic_multiplier <= 0:
        raise ValueError("Invalid input values")

    base_time = distance_km / avg_speed_kmph
    return base_time * traffic_multiplier


if __name__ == "__main__":
    # CI validation tests
    assert round(calculate_bus_eta(60, 60), 2) == 1.00
    assert round(calculate_bus_eta(100, 50), 2) == 2.00
    assert round(calculate_bus_eta(100, 50, 1.5), 2) == 3.00

    print("All ETA calculator tests passed ✅")

